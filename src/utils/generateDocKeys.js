export const generateDocKeys = (refik) => {
  const refData = refik?.current?.innerText.match(/{(.*?)\}/g);
  let keys = [];
  refData.map((ref) => {
    keys.push({ ...ref.substring(1, ref.length - 1).split("-") });
  });
  return keys;
};
