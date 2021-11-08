export const checkUserAlreadyActed = (
  uid: string,
  dataset: unknown[],
  key: string
): boolean => {
  const found = dataset.some((item) => {
    return item[`${key}`] === uid;
  });
  return found;
};
