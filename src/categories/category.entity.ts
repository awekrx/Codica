import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Transaction } from "../transactions/transaction.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

@Entity()
export class Category {
    @ApiProperty({ example: "1", description: "Category unique identifier" })
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty({ example: "Food", description: "Category name" })
    @Column({ type: "varchar", length: "64", unique: true })
    name: string;
}
