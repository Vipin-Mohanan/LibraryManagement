import { CategoriesMiddleware } from './categories.middleware';

describe('CategoriesMiddleware', () => {
  it('should be defined', () => {
    expect(new CategoriesMiddleware()).toBeDefined();
  });
});
