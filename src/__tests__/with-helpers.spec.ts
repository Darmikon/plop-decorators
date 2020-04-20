import { withHelpers } from '../with-helpers';

describe('with-helpers', function () {
  let plop: {
    setHelper: jest.SpyInstance;
  };
  let spy;

  beforeAll(() => {
    spy = jest.fn();
    plop = {
      setHelper: spy,
    };
  });

  it('should call setHelper', () => {
    const userMixins = {
      a: jest.fn(),
      b: jest.fn(),
    };
    // @ts-ignore
    withHelpers(plop, userMixins);

    expect(plop.setHelper).toHaveBeenNthCalledWith(1, 'a', userMixins.a);
    expect(plop.setHelper).toHaveBeenNthCalledWith(2, 'b', userMixins.b);
  });
});
