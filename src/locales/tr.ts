export default {
  hello: {
    world: 'Merhaba {param}!',
    nested: {
      translations: 'Çeviriler',
    },
  },
  'apples#zero': 'Elma yok',
  'apples#one': 'Bir elma',
  'apples#other': '{count} elma',
} as const;
