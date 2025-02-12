/* eslint-disable prettier/prettier */
import { BooksMiddleware } from './books.middleware';

describe('BooksMiddleware', () => {
  it('should be defined', () => {
    expect(new BooksMiddleware()).toBeDefined();
  });
});
