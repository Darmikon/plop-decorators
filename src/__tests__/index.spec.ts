describe('index suite', () => {
  it('should have all decorators', () => {
    const app = require('../index');
    expect(app.withActions).toBeInstanceOf(Function);
    expect(app.withGenerators).toBeInstanceOf(Function);
    expect(app.withHelpers).toBeInstanceOf(Function);
    // †function
  });
});
