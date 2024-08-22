export const getDate = (min: number) => {
  const now = new Date();

  now.setMinutes(now.getMinutes() + min);

  return now;
};
