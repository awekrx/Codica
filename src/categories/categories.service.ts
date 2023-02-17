import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private bankRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.bankRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.bankRepository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Category> {
        return this.bankRepository.findOne({ where: { name } });
    }

    async create(bank: Category): Promise<Category> {
        return this.bankRepository.save(bank);
    }

    async update(id: number, category: Category): Promise<Category> {
        await this.bankRepository.update(id, category);
        return this.bankRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.bankRepository.delete(id);
    }
}
