import { ForbiddenException, NotFoundException } from "@nestjs/common";


export function BookNotFoundError()
{
    throw new NotFoundException('Books not found');
}

export function CategoryNotFoundError()
{
    throw new NotFoundException('Category not found')
}

export function UserNotFoundError()
{
    throw new NotFoundException('User not found')
}

export function UserAlreadyExistError()
{
    throw new ForbiddenException('User already exists');
}

export function BookNotBorrowError()
{
    throw new ForbiddenException('Book is not available for borrowing');
}

export function BorrowLogNotAvailableError()
{
    throw new ForbiddenException('No borrow logs for this user');
}

export function AddCategoryError()
{
    throw new Error('Cannot add category')
}