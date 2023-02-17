import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class BankDTO {
    @ApiProperty({ example: "Food", description: "Bank name" })
    readonly name: string;
}
