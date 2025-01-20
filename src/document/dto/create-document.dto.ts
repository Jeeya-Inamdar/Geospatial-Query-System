import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class GeoJSONPoint {
  @ApiProperty({ example: 'Point' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: [102.0, 2.0],
  })
  @IsArray()
  @IsNotEmpty()
  coordinates: number[];
}

export class CreateDocumentDto {
  @ApiProperty({ example: 'Central Park' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'landmark' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: GeoJSONPoint })
  @ValidateNested()
  @Type(() => GeoJSONPoint)
  location: GeoJSONPoint;
}
