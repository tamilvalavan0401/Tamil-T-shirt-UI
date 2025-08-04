export const checkerValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  } else {
    return true;
  }
};

export const lowercasenosp = (value) => {
  if (value === null || value === undefined || value === '') {
    return '';
  } else {
    return value.toString().replace(/\s/g, '').toLowerCase();
  }
};

export const defaulttextremove = (value) => {
  if (value === null || value === undefined || value === '') {
    return '';
  } else {
    return value
      .toString()
      .replace(/\s/g, '')
      .toLowerCase()
      .replace('-tshirts-', '')
      .replace('-', '');
  }
};

export const removeHTMLTags = (input) => {
  // Step 1: Remove HTML tags
  const noHTML = input?.replace(/<[^>]+>/g, '');

  // Step 2: Decode Unicode/HTML entities
  const entityMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#x27;': "'",
    '&#39;': "'",
    '&nbsp;': ' ',
    // Add more entities as needed
  };

  // Replace common named entities
  const decodedString = noHTML?.replace(
    /&[^;]+;/g,
    (entity) =>
      entityMap[entity] || // Decode known entities
      entity.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)) || // Decode numeric character references (e.g., &#123;)
      entity.replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
        String.fromCharCode(parseInt(code, 16)),
      ), // Decode hexadecimal references (e.g., &#x7B;)
  );

  return decodedString;
};

// export const removeHTMLTags = (input) => {
//   // Step 1: Create a temporary element to decode HTML entities
//   const tempDiv = document.createElement('div');

//   // Step 2: Decode HTML entities by setting and reading `innerHTML`
//   tempDiv.innerHTML = input;
//   let decodedString = tempDiv.textContent || tempDiv.innerText || '';

//   // Step 3: Remove any remaining HTML tags
//   const cleanedString = decodedString.replace(/<[^>]+>/g, '');

//   return cleanedString;
// };

export const removeDuplicates = (arr) => {
  let unique = arr?.reduce(function (acc, curr) {
    if (!acc?.includes(curr)) acc?.push(curr);
    return acc;
  }, []);
  return unique;
};

export const checkerString = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  } else {
    return true;
  }
};

export const checkerStringLen = (value, max) => {
  if (value === null || value === undefined || value === '') {
    return false;
  } else {
    if (value.length === max) return true;
    else return false;
  }
};

export const isValidJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true; // Valid JSON
  } catch (e) {
    return false; // Invalid JSON
  }
};

export const isValidSeoUrlPath = (path) => {
  const regex = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;
  return regex.test(path);
};

export const checkerArray = (value, gesize = 0) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    !Array.isArray(value)
  ) {
    return false;
  } else {
    if (Array.isArray(value)) {
      if (gesize === 0) return true;
      if (value.length >= gesize) return true;
    }
    return false;
  }
};

export const checkerObj = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    Object.keys(value).length === 0
  ) {
    return false;
  } else {
    if (Object.keys(userObj.user.userData).length > 0) return true;
    return false;
  }
};
