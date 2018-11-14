const getPathFromHash = (hash) => hash.substr(1);

const execAppInContext = (app, context) => () => {
  const path = getPathFromHash(context.location.hash);

  app.exec(path);
}

const hashHistoryListener = (app, context = window) => {
  const exec = execAppInContext(app, context);

  context.addEventListener('hashchange', exec);
  exec();
};

export default hashHistoryListener;
