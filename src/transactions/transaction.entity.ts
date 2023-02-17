import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Bank } from "../banks/bank.entity";
import { Category } from "../categories/category.entity";

export enum TransactionType {
    PROFITABLE = "profitable",
    CONSUMABLE = "consumable",
}

@Entity()
export class Transaction {
    @ApiProperty({ example: "1", description: "Unique identifier" })
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty({ example: "200", description: "Transaction amount" })
    @Column("float")
    amount: number;

    @ApiProperty({ example: "profitable", description: "Type of transaction" })
    @Column({
        type: "enum",
        enum: TransactionType,
        nullable: false,
    })
    type: TransactionType;

    @ApiProperty({
        type: () => Bank,
        example: {
            id: 1,
            name: "Mobobank",
            balance: 6000,
        },
        description: "Transaction bank",
    })
    @ManyToOne(() => Bank, (bank) => bank.transactions)
    bank: Bank;

    @ApiProperty({
        example: { id: 1, name: "Food" },
        description: "Transaction bank",
    })
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ApiProperty({ example: "2023-02-17T20:01:34.204Z", description: "Transaction time" })
    @CreateDateColumn()
    createdat: Date;
}
