const mount = (app) => (location) => (
  app.exec(location.pathname)
);

export default mount;
