import slugify from 'slugify';

export function generateSlug(str: string) {
  return slugify(str, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
}
