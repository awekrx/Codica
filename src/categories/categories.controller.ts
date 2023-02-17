import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoriesService } from "./categories.service";
import { CategoryDTO } from "./dto/category.dto";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger/dist";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoryRepository: CategoriesService) {}

    @ApiOperation({ summary: "Returns all categories" })
    @ApiResponse({ status: 200, type: [Category] })
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    @ApiOperation({ summary: "Returns one category by id" })
    @ApiResponse({ status: 200, type: Category })
    @Get("/id/:id")
    async findOne(@Param("id") id: number): Promise<Category> {
        return this.categoryRepository.findOne(id);
    }

    @ApiOperation({ summary: "Returns one category by name" })
    @ApiResponse({ status: 200, type: Category })
    @Get("/name/:name")
    async findByName(@Param("name") name: string): Promise<Category> {
        return this.categoryRepository.findByName(name);
    }

    @ApiOperation({ summary: "Create new category" })
    @ApiResponse({ status: 200, type: Category })
    @Post()
    async create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryRepository.create(categoryDTO);
    }

    @ApiOperation({ summary: "Update category by id" })
    @ApiResponse({ status: 200, type: Category })
    @Put(":id")
    async update(@Param("id") id: number, @Body() categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryRepository.update(id, categoryDTO);
    }

    @ApiOperation({ summary: "Delete category by id" })
    @ApiResponse({ status: 200 })
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        return this.categoryRepository.delete(id);
    }
}
