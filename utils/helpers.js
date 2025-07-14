const { nanoid } = require('nanoid');
const validUrl = require('valid-url');

function gsc() {
  return nanoid(6); // Generates 6-char alphanumeric ID
}

function ivu(url) {
  return validUrl.isUri(url);
}

function ivic(code) {
  return /^[a-zA-Z0-9]{4,12}$/.test(code);
}

module.exports = {
  gsc,
  ivu,
  ivic,
};
