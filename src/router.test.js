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

  it('should call onMatch for every matched exec', () => {
    const onMatch = jest.fn();
    const callback = jest.fn();
    const app = router();
    app.add('/hello', callback);
    app.onMatch(onMatch);
    app.exec('/hello');

    expect(onMatch).toBeCalledWith(callback, {});
  });

  it('should not call the second arg of its not a function', () => {
    const onMatch = jest.fn();
    const app = router();
    app.add('/hello', 'aKey');
    app.onMatch(onMatch);
    app.exec('/hello');

    expect(onMatch).toBeCalledWith('aKey', {});
  });

  it('should be able to unsubscribe', () => {
    const onMatch = jest.fn();
    const app = router();
    app.add('/hello', 'aKey');
    app.onMatch(onMatch);
    app.offMatch(onMatch);
    app.exec('/hello');

    expect(onMatch).not.toBeCalledWith('aKey', {});
  });

  it('should not call classes as functions', () => {
    const onMatch = jest.fn();
    const app = router();
    class MyClass {}
    app.add('/hello', MyClass);
    app.onMatch(onMatch);
    app.exec('/hello');

    expect(onMatch).toBeCalled();
  });
});
