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

## onMatch
`onMatch` and `offMatch` let you add a listener for ANY route matches. You can also
pass strings in instead of callbacks as the second argument to `add` that get passed into
your `onMatch` callback. This works great with setting the current route in a
global store like redux or setState in react.
```javascript
import { router } from '@kevindurb/router';

const app = router();

app.add('/people', 'PEOPLE');
app.add('/people/:id', 'PERSON');

app.onMatch((key, params) => {
  switch (key) {
    case 'PERSON':
      console.log('person! ', params.id);
      break;
    case 'PEOPLE':
      console.log('people!!');
      break;
  }
});

app.exec('/people/256'); // person! 256
app.exec('/people'); // people!!
```

## pathFromRoute
`pathFromRoute` will let you dry up your code with reproducable routes
```javascript
import { router, pathFromRoute } from '@kevindurb/router';

const PERSON_ROUTE = '/people/:id';

const app = router();

app.add(PERSON_ROUTE, (params) => {
  console.log('person! ', params.id)
});

app.exec(pathFromRoute(PERSON_ROUTE, { id: 256 })); // person! 256
```

## Usage with history package
```bash
npm install --save history
```

```javascript
import createHistory from 'history/createBrowserHistory';
import { router, historyMount } from '@kevindurb/router';

const history = createHistory();
const app = router();

app.add('/people', () => {
  console.log('showing people!');
});

app.add('/people/:id', ({ id }) => {
  console.log('load person with id: ', id);
});

history.listen(historyMount(app));

history.push('/people/65'); // load person with id: 65

```
