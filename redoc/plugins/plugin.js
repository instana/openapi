const EnhanceDescriptions = require('./decorators/enhance-x-descriptions.js');
const id = 'plugin';

/** @type {import('@redocly/cli').DecoratorsConfig} */
const decorators = {
  oas3: {
    'enhance-x-descriptions': EnhanceDescriptions,
  },
};

module.exports = {
  id,
  decorators,
};

  