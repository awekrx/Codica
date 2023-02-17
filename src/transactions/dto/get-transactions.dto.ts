import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class GetTransactionDTO {
    @ApiProperty({ example: "0", description: "Pagination page" })
    readonly page: number;
    @ApiProperty({ example: "10", description: "Pagination limit" })
    readonly limit: number;
}
