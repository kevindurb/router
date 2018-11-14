import router from './router';

describe('a router', () => {
  it('should call a callback when exec\'d with the correct path', () => {
    const callback = jest.fn();
    const app = router();
    app.add('/hello', callback);
    app.exec('/hello');

    expect(callback).toBeCalled();
  });

  it('should pass params from the url', () => {
    const callback = jest.fn();
    const app = router();
    app.add('/:hello', callback);
    app.exec('/world');

    expect(callback).toBeCalledWith({ hello: 'world' });
  });

  it('should handle if an optional param is not given', () => {
    const callback = jest.fn();
    const app = router();
    app.add('/:hello/:other?', callback);
    app.exec('/world');

    expect(callback).toBeCalledWith({ hello: 'world' });
  });

  it('should handle if an optional param is given', () => {
    const callback = jest.fn();
    const app = router();
    app.add('/:hello/:other?', callback);
    app.exec('/world/moon');

    expect(callback).toBeCalledWith({ hello: 'world', other: 'moon' });
  });

  it('should only call the first matching route', () => {
    const callback = jest.fn();
    const another = jest.fn();
    const app = router();
    app.add('/a', callback);
    app.add('/a', another);
    app.exec('/a');

    expect(callback).toBeCalled();
    expect(another).not.toBeCalled();
  });
});
