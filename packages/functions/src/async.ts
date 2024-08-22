export const sleep = async (s: number) => {
  return new Promise(async (resolve) => setTimeout(resolve, s * 1000));
};
