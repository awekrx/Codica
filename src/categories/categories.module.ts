import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoriesController } from "./categories.controller";

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [CategoriesService],
})
export class CategoriesModule {}
