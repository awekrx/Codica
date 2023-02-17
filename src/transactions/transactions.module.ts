import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { CategoriesModule } from "../categories/categories.module";
import { BanksModule } from "../banks/banks.module";

@Module({
    providers: [TransactionsService],
    controllers: [TransactionsController],
    imports: [TypeOrmModule.forFeature([Transaction]), CategoriesModule, BanksModule],
})
export class TransactionsModule {}
