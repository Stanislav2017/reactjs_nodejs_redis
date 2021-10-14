export const parseURLQuery = (url = "") => {
  if (!url) {
    return null;
  }
  return url
    .replace(/^\?/, "")
    .split("&")
    .reduce((acc, v) => {
      const params = v.split("=");
      acc = { ...acc, [params[0]]: params[1] };
      return acc;
    }, {});
};
