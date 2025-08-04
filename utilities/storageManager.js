import { AK, SK } from "@/lib/api-config";

export const handleGetInfoStorageItems = (keyvalue) => {
  if(!localStorage) return;
  const items = localStorage.getItem(keyvalue)
    ? JSON.parse(localStorage.getItem(keyvalue))
    : null;
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleSetInfoStorageItems = (keyvalue, infoData) => {
  if(!localStorage) return;
  localStorage.setItem(keyvalue, JSON.stringify(infoData));
};

export const handleSetCategoryInfoStorageItems = (categoryinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(SK.CATEGORYINFODATA, JSON.stringify(categoryinfoData));
};

export const handleGetCategoryInfoStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.CATEGORYINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleSetCouponInfoStorageItems = (couponinfodata) => {
  if(!localStorage) return;
  localStorage.setItem(SK.COUPONINFODATA, JSON.stringify(couponinfodata));
};

export const handleGetCouponInfoStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.COUPONINFODATA));
  if (items === null) {
    return [];
  } else {
    return items;
  }
};

export const handleSetProductsInfoStorageItems = (productsinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(SK.PRODUCTSINFODATA, JSON.stringify(productsinfoData));
};

export const handleGetProductsInfoStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.PRODUCTSINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleSetColorCodesInfoStorageItems = (colorcodesinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(
    SK.COLORCODESINFODATA,
    JSON.stringify(colorcodesinfoData),
  );
};

export const handleGetColorCodeStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.COLORCODESINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleSetSizeInfoStorageItems = (sizeinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(SK.SIZEINFODATA, JSON.stringify(sizeinfoData));
};

export const handleSetProductsSizeInfoStorageItems = (productssizeinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(
    SK.PRODUCTSSIZEINFODATA,
    JSON.stringify(productssizeinfoData),
  );
};

export const handleSetProductsColorCodesInfoStorageItems = (
  productscolorcodesinfoData,
) => {
  if(!localStorage) return;
  localStorage.setItem(
    SK.PRODUCTSCOLORCODESINFODATA,
    JSON.stringify(productscolorcodesinfoData),
  );
};

export const handleGetProductsSizeStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.PRODUCTSSIZEINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleGetProductsColorCodesStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.PRODUCTSCOLORCODESINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleGetSizeStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.SIZEINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};

export const handleSetVersionManagerStorageItems = (versionmanagerinfoData) => {
  if(!localStorage) return;
  localStorage.setItem(
    SK.VERSIONMANAGERINFODATA,
    JSON.stringify(versionmanagerinfoData),
  );
};

export const handleGetVersionManagerStorageItems = () => {
  if(!localStorage) return;
  const items = JSON.parse(localStorage.getItem(SK.VERSIONMANAGERINFODATA));
  if (items === null) {
    return null;
  } else {
    return items;
  }
};
