import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CategoryDTO {
    @ApiProperty({ example: "Food", description: "Category name" })
    readonly name: string;
}
