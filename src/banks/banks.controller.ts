import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { Bank } from "./bank.entity";
import { BanksService, DeleteResult } from "./banks.service";
import { BankDTO as BankDTO } from "./dto/bank.dto";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger/dist";

@ApiTags("Banks")
@Controller("banks")
export class BanksController {
    constructor(private readonly bankRepository: BanksService) {}

    @ApiOperation({ summary: "Returns all banks" })
    @ApiResponse({ status: 200, type: [Bank] })
    @Get()
    async findAll(): Promise<Bank[]> {
        return this.bankRepository.findAll();
    }

    @ApiOperation({ summary: "Return one bank by id" })
    @ApiResponse({ status: 200, type: Bank })
    @Get("/id/:id")
    async findOne(@Param("id") id: number): Promise<Bank> {
        return this.bankRepository.findOne(id);
    }

    @ApiOperation({ summary: "Return one bank by name" })
    @ApiResponse({ status: 200, type: Bank })
    @Get("/name/:name")
    async findByName(@Param("name") name: string): Promise<Bank> {
        return this.bankRepository.findByName(name);
    }

    @ApiOperation({ summary: "Create new bank" })
    @ApiResponse({ status: 200, type: Bank })
    @Post()
    async create(@Body() bankDTO: BankDTO): Promise<Bank> {
        return this.bankRepository.create(bankDTO);
    }

    @ApiOperation({ summary: "Update bank by id" })
    @ApiResponse({ status: 200, type: Bank })
    @Put(":id")
    async update(@Param("id") id: number, @Body() bankDTO: BankDTO): Promise<Bank> {
        return this.bankRepository.update(id, bankDTO);
    }

    @ApiOperation({ summary: "Delete bank by id" })
    @ApiResponse({
        status: 200,
    })
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<DeleteResult> {
        return this.bankRepository.delete(id);
    }
}
