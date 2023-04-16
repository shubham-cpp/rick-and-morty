export function classNames(...classes: unknown[]): string {
  // Eg: className={classNames('inline-block rounded-full', sizes[size])}
  return classes.filter(Boolean).join(' ')
}

export const GLOBALS = {
  BASE_URL: 'https://rickandmortyapi.com/api',
  FAVORITE_CHARACTERS: 'favoriteCharacters'
}
