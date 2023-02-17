import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bank } from "./bank.entity";

export interface DeleteResult {
    success: boolean;
    error?: string;
}

@Injectable()
export class BanksService {
    constructor(
        @InjectRepository(Bank)
        private bankRepository: Repository<Bank>,
    ) {}

    async findAll(): Promise<Bank[]> {
        return this.bankRepository.find({ relations: ["transactions"] });
    }

    async findOne(id: number): Promise<Bank> {
        return this.bankRepository.findOne({ where: { id }, relations: ["transactions"] });
    }

    async findByName(name: string): Promise<Bank> {
        return this.bankRepository.findOne({ where: { name }, relations: ["transactions"] });
    }

    async create(bank: Bank): Promise<Bank> {
        return this.bankRepository.save(bank);
    }

    async update(id: number, bank: Bank): Promise<Bank> {
        await this.bankRepository.update(id, bank);
        return this.bankRepository.findOne({ where: { id }, relations: ["transactions"] });
    }

    async delete(id: number): Promise<DeleteResult> {
        let bank = await this.bankRepository.findOne({ where: { id }, relations: ["transactions"] });
        if (bank.transactions.length === 0) {
            await this.bankRepository.delete(id);
            return {
                success: true,
            };
        } else {
            return {
                success: true,
                error: "Bank transactions must be empty",
            };
        }
    }
}
