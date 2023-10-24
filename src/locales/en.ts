export default {
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
