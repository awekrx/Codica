import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class TransactionDTO {
    @ApiProperty({ example: "200", description: "Transaction amount" })
    readonly amount: number;
    @ApiProperty({ example: "profitable", description: "Transaction type" })
    readonly type: "profitable" | "consumable";
    @ApiProperty({ example: "Mobobank", description: "Transaction bank" })
    readonly bank: string;
    @ApiProperty({ example: "[Food, Salary]", description: "Transaction categories" })
    readonly categories: string[];
}
