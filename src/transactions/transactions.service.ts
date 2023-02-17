import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Transaction, TransactionType } from "./transaction.entity";
import { BanksService } from "../banks/banks.service";
import { CategoriesService } from "../categories/categories.service";
import { TransactionDTO } from "./dto/transactions.dto";
import { Category } from "../categories/category.entity";
import { GetStatisticsDTO } from "./dto/get-statistic.dto";
import { GetTransactionDTO } from "./dto/get-transactions.dto";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private readonly categoriesService: CategoriesService,
        private readonly banksService: BanksService,
    ) {}

    async findAll(getTransactionDTO: GetTransactionDTO): Promise<Transaction[]> {
        return this.transactionRepository.find({
            skip: getTransactionDTO.page * getTransactionDTO.limit,
            take: getTransactionDTO.limit,
            relations: ["bank", "categories"],
        });
    }

    async findOne(id: number): Promise<Transaction> {
        return this.transactionRepository.findOne({ where: { id }, relations: ["bank", "categories"] });
    }

    async create(transactionDTO: TransactionDTO): Promise<Transaction> {
        let type =
            transactionDTO.type == TransactionType.PROFITABLE ? TransactionType.PROFITABLE : TransactionType.CONSUMABLE;
        let bank = await this.banksService.findByName(transactionDTO.bank);
        let categories = [];

        for (let name of transactionDTO.categories) {
            let category = await this.categoriesService.findByName(name);
            if (category) {
                categories.push(category);
            }
        }

        let transaction = this.transactionRepository.create({
            amount: transactionDTO.amount,
            type: type,
            bank: bank,
            categories: categories,
        });
        await this.transactionRepository.save(transaction);
        let bankBalance = 0;
        for (let bankTransaction of bank.transactions) {
            if (bankTransaction.type === TransactionType.PROFITABLE) {
                bankBalance += bankTransaction.amount;
            } else {
                bankBalance -= bankTransaction.amount;
            }
        }
        await this.banksService.update(bank.id, { name: bank.name, balance: bankBalance });
        return this.transactionRepository.findOne({ where: { id: transaction.id }, relations: ["bank", "categories"] });
    }

    async delete(id: number): Promise<void> {
        let transaction = await this.transactionRepository.findOne({ where: { id }, relations: ["bank"] });
        await this.transactionRepository.delete(id);
        let bank = await this.banksService.findOne(transaction.bank.id);
        let bankBalance = 0;
        for (let bankTransaction of bank.transactions) {
            if (bankTransaction.type === TransactionType.PROFITABLE) {
                bankBalance += bankTransaction.amount;
            } else {
                bankBalance -= bankTransaction.amount;
            }
        }
        await this.banksService.update(bank.id, { name: bank.name, balance: bankBalance });
    }

    async getStatistics(getStatisticsDTO: GetStatisticsDTO): Promise<{ [key: string]: number }> {
        const categories: Category[] = [];
        for (let id of getStatisticsDTO.categoryIds) {
            categories.push(await this.categoriesService.findOne(id));
        }

        const results = {};
        for (let category of categories) {
            let transactions = await this.transactionRepository.find({
                where: {
                    categories: category,
                    createdat: Between(getStatisticsDTO.fromPeriod, getStatisticsDTO.toPeriod),
                },
                relations: ["categories"],
            });

            console.log(transactions);

            let balance = transactions.reduce((acc, transaction) => {
                if (transaction.type === TransactionType.PROFITABLE) {
                    return acc + transaction.amount;
                } else {
                    return acc - transaction.amount;
                }
            }, 0);

            results[category.name] = balance;
        }

        return results;
    }
}
