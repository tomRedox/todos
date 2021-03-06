// TODO -- this should probably be some kind of test package that people use
/* global withRenderedTemplate:true */

const withDiv = function(callback) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  try {
    callback(el);
  } finally {
    document.body.removeChild(el);
  }
};

withRenderedTemplate = function(template, data, callback) {
  withDiv((el) => {
    template = _.isString(template) ? Template[template] : template;
    Blaze.renderWithData(template, data, el);
    Tracker.flush();
    callback(el);
  });
};
