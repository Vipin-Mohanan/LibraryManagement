/* eslint-disable prettier/prettier */
import { LibrarianMiddleware } from './librarian.middleware';

describe('LibrarianMiddleware', () => {
  it('should be defined', () => {
    expect(new LibrarianMiddleware()).toBeDefined();
  });
});
