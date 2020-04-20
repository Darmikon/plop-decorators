import { withActions } from '../with-actions';
import * as actionsPrepend from '../action-prepend';

describe('with-actions', function () {
  let plop: {
    setActionType: jest.SpyInstance;
  };
  let spy;

  beforeAll(() => {
    spy = jest.fn();
    plop = {
      setActionType: spy,
    };
  });

  it('should call setActionType', () => {
    const userActions = {
      a: jest.fn(() => 'A'),
      b: jest.fn(() => 'B'),
    };
    const userMixins = {
      a: 'MIXIN_A',
      b: 'MIXIN_B',
    };
    const mockResponseFromPrepend = 'ACTION_PREPEND';

    jest
      .spyOn(actionsPrepend, 'actionPrepend')
      // @ts-ignore
      .mockImplementation(() => mockResponseFromPrepend);
    // @ts-ignore
    withActions(plop, userActions, userMixins);

    expect(plop.setActionType).toHaveBeenNthCalledWith(1, 'prepend', mockResponseFromPrepend);
    expect(plop.setActionType).toHaveBeenNthCalledWith(2, 'a', 'A');
    expect(plop.setActionType).toHaveBeenNthCalledWith(3, 'b', 'B');
    expect(userActions.a).toHaveBeenCalledWith(userMixins);
    expect(userActions.b).toHaveBeenCalledWith(userMixins);
  });
});
