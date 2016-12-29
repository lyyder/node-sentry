const Raven = require('raven');

const causeError = () => {
  Raven.captureBreadcrumb({
    message: 'Top level error action',
    category: 'test-breadcrumb'
  });

  err1();
}
const err1 = () => {
  Raven.captureBreadcrumb({
    message: 'Second level error action',
    category: 'test-breadcrumb'
  });

  err2();
}
const err2 = () => {
  Raven.captureBreadcrumb({
    message: 'Third level error action',
    category: 'test-breadcrumb'
  });

  throw new Error();
}

module.exports.causeError = causeError;
