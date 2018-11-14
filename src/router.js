import pathToRegexp from 'path-to-regexp';

const routeMatchesPath = (path) => ({ regex }) => regex.test(path);

const zip = (a, b) =>
  a.reduce((acc, k, i) => ({ ...acc, [k]: b[i] }), {});

class Router {
  constructor() {

    this.routes = [
    ];
  }

  add(route, fn) {
    let keys = [];
    const regex = pathToRegexp(route, keys);

    this.routes.push({
      regex,
      keys,
      fn,
    });

    return this;
  }

  exec(path) {
    const matchingRoute = this.routes.find(routeMatchesPath(path));

    if (matchingRoute) {
      const {
        regex,
        keys,
        fn,
      } = matchingRoute;

      const result = regex.exec(path);
      const values = result.slice(1);
      const params = zip(
        keys.map(key => key.name),
        values
      );

      fn(params);
    }

    return this;
  }
}

export default (...args) => new Router(...args);
