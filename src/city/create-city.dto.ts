import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class GeoJSONPolygon {
  @ApiProperty({ example: 'Polygon' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: [
      [
        [102.0, 2.0],
        [103.0, 2.0],
        [103.0, 3.0],
        [102.0, 3.0],
        [102.0, 2.0],
      ],
    ],
  })
  @IsArray()
  @IsNotEmpty()
  coordinates: number[][][];
}

export class CreateCityDto {
  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: GeoJSONPolygon })
  @ValidateNested()
  @Type(() => GeoJSONPolygon)
  boundary: GeoJSONPolygon;
}
