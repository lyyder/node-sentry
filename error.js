const causeError = () => err1();
const err1 = () => err2();
const err2 = () => err3();
const err3 = () => errFinal();
const errFinal = () => {
  throw new Error();
}

module.exports.causeError = causeError;
