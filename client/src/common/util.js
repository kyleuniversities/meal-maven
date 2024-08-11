export const deepCopy = (item) => {
  return JSON.parse(JSON.stringify(item));
};

export const capitalizeFirstLetter = (text) => {
  if (!text) {
    return "";
  }
  return text[0].toUpperCase() + text.substring(1);
};

export const decapitalizeFirstLetter = (text) => {
  if (!text) {
    return "";
  }
  return text[0].toLowerCase() + text.substring(1);
};

export const toCamelCase = (title) => {
  const words = title.split(/[ ]+/);
  for (let i = 0; i < words.length; i++) {
    if (i === 0) {
      words[i] = words[i].toLowerCase();
      continue;
    }
    words[i] = capitalizeFirstLetter(words[i]);
  }
  return words.join("");
};
