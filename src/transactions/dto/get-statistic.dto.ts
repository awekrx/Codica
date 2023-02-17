import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class GetStatisticsDTO {
    @ApiProperty({ example: "[1, 2, 3]", description: "Ids categories" })
    readonly categoryIds: number[];
    @ApiProperty({ example: "2023-02-17T20:01:34.204Z", description: "Searhc from time" })
    readonly fromPeriod: Date;
    @ApiProperty({ example: "2023-03-17T20:01:34.204Z", description: "Serach to time" })
    readonly toPeriod: Date;
}
