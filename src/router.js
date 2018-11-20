import pathToRegexp from 'path-to-regexp';

const routeMatchesPath = (path) => ({ regex }) => regex.test(path);

const zip = (a, b) =>
  a.reduce((acc, k, i) => ({ ...acc, [k]: b[i] }), {});

const isFunction = (obj) =>
 Object.prototype.toString.call(obj) === '[object Function]';


class Router {
  constructor() {

    this.routes = [];
    this.sunscribers = [];
  }

  add(route, fnOrKey) {
    let keys = [];
    const regex = pathToRegexp(route, keys);

    this.routes.push({
      regex,
      keys,
      fnOrKey,
    });

    return this;
  }

  onMatch(fn) {
    this.sunscribers.push(fn);
    return this;
  }

  offMatch(fn) {
    this.sunscribers = this.sunscribers
      .filter((subscriber) => subscriber !== fn);
    return this;
  }

  handleSubscribers(fnOrKey, params) {
    this.sunscribers.forEach((subscriber) => {
      subscriber(fnOrKey, params);
    });
    return this;
  }

  exec(path) {
    const matchingRoute = this.routes.find(routeMatchesPath(path));

    if (matchingRoute) {
      const {
        regex,
        keys,
        fnOrKey,
      } = matchingRoute;

      const result = regex.exec(path);
      const values = result.slice(1);
      const params = zip(
        keys.map(key => key.name),
        values
      );

      if (isFunction(fnOrKey)) {
        try {
          fnOrKey(params);
        } catch (e) {
          // nothing to do here
        }
      }


      this.handleSubscribers(fnOrKey, params);
    }

    return this;
  }
}

export default (...args) => new Router(...args);
