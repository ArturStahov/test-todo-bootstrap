export function errorHandler(error) {
  const { status } = error.response;
  switch (status) {
    case 404:
      throw new Error('Not found');
      break;
    case 400:
      throw new Error('Bad request');
      break;
    default:
      throw new Error('Something was wrong, try again')
      break;
  }
}

export function excludeParams(payload, excludeParams) {
  const exclude = new Set(excludeParams)
  return Object.fromEntries(Object.entries(payload).filter(e => !exclude.has(e[0])));
}