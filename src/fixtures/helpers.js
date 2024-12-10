import random from "random";

export const generateEmail = (base = "test") => {
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10).replace(/-/g, "").slice(2);

  const randomNum = random.int(1000, 9999);

  const result = `${base}${dateString}_${randomNum}@test.com`;
  console.log(result);

  return result;
};
