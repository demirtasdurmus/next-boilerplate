export default {
  ServerPage: {
    title: 'Server Page',
    description: 'This is a server side rendered page',
  },
  hello: {
    world: 'Hello {param}!',
    nested: {
      translations: 'Translations',
    },
  },
  'apples#zero': 'No apples',
  'apples#one': 'An apple',
  'apples#other': '{count} apples',
} as const;
