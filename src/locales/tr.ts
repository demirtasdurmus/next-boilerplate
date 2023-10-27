export default {
  ServerPage: {
    title: 'Server Sayfası',
    description: 'Bu bir sunucu tarafından oluşturulmuş sayfadır',
  },
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
