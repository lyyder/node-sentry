Raven.config(CONFIG.sentryDsn).install();

const errorFn = () => {
  forceError();
}

const errorBtn = document.querySelector('#error-btn');

errorBtn.addEventListener('click', errorFn);
