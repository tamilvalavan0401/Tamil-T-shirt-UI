import { AK, SK } from "@/lib/api-config";
import { AxioseGET, AxiosGET, AxiosMockupGET } from './axioscall';
import { checkerArray } from './checker';

import {
  handleGetInfoStorageItems,
  handleSetInfoStorageItems,
} from './storageManager';

export const put = (storagename = '', storeinfo) => {
  handleSetInfoStorageItems(storagename, storeinfo);
  return true;
};
export const get = (storagename = '') => {
  let storeinfo = handleGetInfoStorageItems(storagename);
  return storeinfo;
};

export const callSync = async (
  addon = null,
  hardreset = false,
  storagename = '',
  apiname = '',
  singledata = false,
  mockapiname = '',
  mockdata = false,
) => {
  try {
    let storeinfo = handleGetInfoStorageItems(storagename);
    //console.log(storeinfo);
    if (hardreset) storeinfo = null;
    if (mockdata) storeinfo = null;
    // console.log(
    //   "storagename : " +
    //     storagename +
    //     "hardreset : " +
    //     hardreset +
    //     " mockup : " +
    //     mockdata
    // );
    //console.log(storeinfo);
    if (storeinfo === null || storeinfo === undefined) {
      if (!hardreset) {
        storeinfo = await AxiosMockupGET(mockapiname)
          .then((res) => {
            if (res != null && res.data.length > 0)
              if (singledata) return res.data[0];
              else return res.data;
            else return null;
          })
          .catch((error) => {});
      } else {
        storeinfo = await AxiosGET(apiname)
          .then((res) => {
            if (res != null && res.data.length > 0)
              if (singledata) return res.data[0];
              else return res.data;
            else return null;
          })
          .catch((error) => {});
      }

      if (checkerArray(storeinfo, 2000)) {
        handleSetInfoStorageItems(storagename, storeinfo.slice(0, 2000));
      } else handleSetInfoStorageItems(storagename, storeinfo);
    }
    if (addon != null && storeinfo != null) {
      return storeinfo[addon];
    }
    return storeinfo;
  } catch (err) {
    //console.log(err);
    return null;
  }
};

export const calleSync = async (
  addon = null,
  hardreset = false,
  storagename = '',
  apiname = '',
  singledata = false,
  mockapiname = '',
  mockdata = false,
) => {
  try {
    let storeinfo = null; // handleGetInfoStorageItems(storagename);
    //console.log(storeinfo);
    if (hardreset) storeinfo = null;
    if (mockdata) storeinfo = null;
    // console.log(
    //   "storagename : " +
    //     storagename +
    //     "hardreset : " +
    //     hardreset +
    //     " mockup : " +
    //     mockdata
    // );
    //console.log(storeinfo);
    //if (storeinfo === null || storeinfo === undefined) {
    storeinfo = await AxioseGET(apiname)
      .then((res) => {
        if (res != null && res.data.length > 0)
          if (singledata) return res.data[0];
          else return res.data;
        else return null;
      })
      .catch((error) => {});

    // if (checkerArray(storeinfo, 2000)) {
    //   handleSetInfoStorageItems(storagename, storeinfo.slice(0, 2000));
    // } else handleSetInfoStorageItems(storagename, storeinfo);
    //}
    if (addon != null && storeinfo != null) {
      return storeinfo[addon];
    }
    return storeinfo;
  } catch (err) {
    //console.log(err);
    return null;
  }
};

export const callStores = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.STORESMANAGERINFODATA,
      AK.eSTORESJSONAPI,
      true,
      AK.MOCKUP_STORESJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callProductsList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.PRODUCTSINFODATA,
      AK.ePRODUCTSJSONAPI,
      false,
      AK.MOCKUP_PRODUCTSJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callOrderStatusList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.ORDERSTATUSINFODATA,
      AK.eORDERSTATUSJSONAPI,
      false,
      AK.MOCKUP_ORDERSTATUSJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callCategoryList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.CATEGORYINFODATA,
      AK.eCATEGORYJSONAPI,
      false,
      AK.MOCKUP_CATEGORYJSONAPI,
      mockup,
    );
  } catch (err) {
    //console.log(err);
    return null;
  }
};

export const callSizeList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.SIZEINFODATA,
      AK.eSIZEJSONAPI,
      false,
      AK.MOCKUP_SIZEJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callCountryList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.COUNTRYINFODATA,
      AK.eCOUNTRIESJSONAPI,
      false,
      AK.MOCKUP_COUNTRIESJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callWeightList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.WEIGHTINFODATA,
      AK.eWEIGHTJSONAPI,
      false,
      AK.MOCKUP_WEIGHTJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callVariationsList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.VARIATIONSINFODATA,
      AK.eVARIATIONSJSONAPI,
      false,
      AK.MOCKUP_VARIATIONSJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callProductsSizeList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.PRODUCTSSIZEINFODATA,
      AK.ePRODUCTSSIZESJSONAPI,
      false,
      AK.MOCKUP_PRODUCTSSIZESJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callColorList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.COLORCODESINFODATA,
      AK.eCOLORCODESJSONAPI,
      false,
      AK.MOCKUP_COLORCODESJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callProductsColorList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.PRODUCTSCOLORCODESINFODATA,
      AK.ePRODUCTSCOLORCODESJSONAPI,
      false,
      AK.MOCKUP_PRODUCTSCOLORCODESJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};

export const callVersionMangerList = async (
  addon = null,
  hardreset = false,
  mockup = false,
) => {
  try {
    return await calleSync(
      addon,
      hardreset,
      SK.VERSIONMANAGERINFODATA,
      AK.eVERSIONMANAGERJSONAPI,
      false,
      AK.MOCKUP_VERSIONMANAGERJSONAPI,
      mockup,
    );
  } catch (err) {
    return null;
  }
};
