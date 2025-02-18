import { LibrarianAuthGuard } from './librarian-auth.guard';

describe('LibrarianAuthGuard', () => {
  it('should be defined', () => {
    expect(new LibrarianAuthGuard()).toBeDefined();
  });
});
