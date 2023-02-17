import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { Transaction } from "./transaction.entity";
import { TransactionDTO } from "./dto/transactions.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger/dist";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { GetStatisticsDTO } from "./dto/get-statistic.dto";
import { GetTransactionDTO } from "./dto/get-transactions.dto";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsRepository: TransactionsService) {}

    @ApiOperation({ summary: "Returns all transactions" })
    @ApiResponse({ status: 200, type: [Transaction] })
    @Get()
    async findAll(@Body() getTransactionDTO: GetTransactionDTO): Promise<Transaction[]> {
        return this.transactionsRepository.findAll(getTransactionDTO);
    }

    @ApiOperation({ summary: "Returns one transaction by id" })
    @ApiResponse({ status: 200, type: Transaction })
    @Get("/id/:id")
    async findOne(@Param("id") id: number): Promise<Transaction> {
        return this.transactionsRepository.findOne(id);
    }

    @ApiOperation({ summary: "Create new transaction" })
    @ApiResponse({ status: 200, type: Transaction })
    @Post()
    async create(@Body() transactionDTO: TransactionDTO): Promise<Transaction> {
        return this.transactionsRepository.create(transactionDTO);
    }

    @ApiOperation({ summary: "Delete transaction" })
    @ApiResponse({ status: 200 })
    @Delete("/id/:id")
    async delete(@Param("id") id: number): Promise<void> {
        return this.transactionsRepository.delete(id);
    }

    @ApiOperation({ summary: "Getting statistics between certain times by category id" })
    @ApiResponse({ status: 200, type: Array })
    @Get("/statistics")
    async statistics(@Body() getStatisticsDTO: GetStatisticsDTO): Promise<any> {
        return this.transactionsRepository.getStatistics(getStatisticsDTO);
    }
}
