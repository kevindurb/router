import hashHistoryListener from './hashHistoryListener';

describe('hashHistoryListener', () => {
  it('should immeadately exec app with current hash', () => {
    const context = {
      location: {
        hash: '#/stuff',
      },
      addEventListener() {}
    };
    const app = { exec: jest.fn() };

    hashHistoryListener(app, context);

    expect(app.exec).toBeCalledWith('/stuff');
  });
  it('should re exec on hashchange', () => {
    let eventListener;
    const context = {
      location: {
        hash: '#/stuff',
      },
      addEventListener(name, cb) {
        eventListener = cb;
      }
    };
    const app = { exec: jest.fn() };

    hashHistoryListener(app, context);

    context.location.hash = '#/other';
    eventListener();

    expect(app.exec).toBeCalledWith('/stuff');
    expect(app.exec).toBeCalledWith('/other');
  });
});
