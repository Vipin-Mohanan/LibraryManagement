/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {

    @ApiProperty()
    category_id ?: number;

    @ApiProperty()
    category_name: string;
}
