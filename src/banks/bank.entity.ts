import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "../transactions/transaction.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

@Entity()
export class Bank {
    @ApiProperty({ example: "1", description: "Bank unique identifier" })
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty({ example: "Mobobank", description: "Bank name" })
    @Column({ type: "varchar", length: "32", unique: true })
    name: string;

    @ApiProperty({ example: "600", description: "Bank current balance" })
    @Column("float", { default: 0 })
    balance?: number;

    @ApiProperty({
        example: [
            {
                id: 1,
                amount: 200,
                type: "profitable",
                createdat: "2023-02-17T20:01:34.204Z",
            },
            {
                id: 2,
                amount: 200,
                type: "consumable",
                createdat: "2023-02-17T20:02:38.115Z",
            },
        ],
        description: "Bank transaction operations",
    })
    @OneToMany(() => Transaction, (transaction) => transaction.bank)
    transactions?: Transaction[];
}
