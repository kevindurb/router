[![npm (scoped)](https://img.shields.io/npm/v/@kevindurb/router.svg)](https://npmjs.com/package/@kevindurb/router)
# router
A simple js router designed to solve one problem outside of any other frameworks
like React, Angular, or Vue

## Installing
```bash
npm install --save @kevindurb/router
```

## Usage
```javascript
import { router } from '@kevindurb/router';

const app = router();

app.add('/people', () => {
  console.log('showing people!');
});

app.add('/people/:id', ({ id }) => {
  console.log('load person with id: ', id);
});

app.exec('/people/256'); // load person with id: 256
app.exec('/people'); // showing people!
```

## Usage with history package
```bash
npm install --save history
```

```javascript
import createHistory from 'history/createBrowserHistory';
import { router, mountHistory } from '@kevindurb/router';

const history = createHistory();
const app = router();

app.add('/people', () => {
  console.log('showing people!');
});

app.add('/people/:id', ({ id }) => {
  console.log('load person with id: ', id);
});

history.listen(mountHistory(app));

history.push('/people/65'); // load person with id: 65

```
