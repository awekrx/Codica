import { Module } from "@nestjs/common";
import { Bank } from "./bank.entity";
import { BanksController } from "./banks.controller";
import { BanksService } from "./banks.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [BanksController],
    providers: [BanksService],
    imports: [TypeOrmModule.forFeature([Bank])],
    exports: [BanksService],
})
export class BanksModule {}
