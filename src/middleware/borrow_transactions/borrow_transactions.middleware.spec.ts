/* eslint-disable prettier/prettier */
import { BorrowTransactionsMiddleware } from './borrow_transactions.middleware';

describe('BorrowTransactionsMiddleware', () => {
  it('should be defined', () => {
    expect(new BorrowTransactionsMiddleware()).toBeDefined();
  });
});
