import pathToRegexp from 'path-to-regexp';

const pathFromRoute = (route, params) => {
  return pathToRegexp.compile(route)(params);
};

export default pathFromRoute;
