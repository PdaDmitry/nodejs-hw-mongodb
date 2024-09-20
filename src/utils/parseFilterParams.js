const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = ['work', 'home', 'personal'];
  if (isType.includes(type)) return type;

  //   return 'personal';
};

const perseIsBoolean = (isFavourite) => {
  if (typeof isFavourite !== 'string') return null;
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  // return null;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedBoolean = perseIsBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedBoolean,
  };
};
