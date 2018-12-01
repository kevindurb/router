import pathFromRoute from './pathFromRoute';

describe('#pathFromRoute', () => {
  it('should be able to replace params in a route', () => {
    expect(pathFromRoute('/people/:id', { id: 5 })).toBe('/people/5');
  });
});
