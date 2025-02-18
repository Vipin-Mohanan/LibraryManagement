/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

export const addBookChecker = async(createBookDto:CreateBookDto, imageBuffer)=>{
    
        const{title,author,description,publisher,publication_year,isbn,category_id,copies_available,total_copies} = createBookDto;
      

        if(!title || !author || !description || !publisher || !publication_year || !isbn || !category_id || !copies_available || !total_copies )
        {
            throw new BadRequestException('Please fill in all fields');
        }

        if(!imageBuffer)
        {
            throw new BadRequestException('Please add an image')
        }

        if(copies_available> total_copies)
        {
            throw new BadRequestException("Available copy count shouldn't exceed the total count")
        }

        if(publication_year<1800)
        {
            throw new BadRequestException("Publication year count shouldn't go below 1800")
        }


}