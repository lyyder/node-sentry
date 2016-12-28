window.addEventListener('unhandledrejection', (event) => Raven.captureException(event));

Raven.config(CONFIG.sentryDsn).install();

const names = ['john', 'jane', 'bob', 'alice'];
const name = names[Math.floor(Math.random() * names.length)];
const user = {
  username: name,
  email: `${name}@example.com`
};

Raven.setUserContext(user);

const jsErrorFn = () => {
  Raven.captureBreadcrumb({
    message: 'Invoking a js error',
    category: 'error-test',
    data: {
       foo: 'bar'
    }
  });

  throw new Error('Sentry JS test error');
}

const promiseErrorFn = () => {
  Raven.captureBreadcrumb({
    message: 'Invoking a promise error',
    category: 'error-test',
    data: {
       foo: 'bar'
    }
  });


  const errorPromise = new Promise((resolve, reject) => {
    throw new Error('Error thrown from a promise');
  });
}

const jsErrorBtn = document.querySelector('#js-error-btn');
const promiseErrorBtn = document.querySelector('#promise-error-btn');

jsErrorBtn.addEventListener('click', jsErrorFn);
promiseErrorBtn.addEventListener('click', promiseErrorFn);
