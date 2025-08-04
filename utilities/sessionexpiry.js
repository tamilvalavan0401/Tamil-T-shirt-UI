"use client";


import { initialState } from '@/store/user/state';
import { getStorage } from './setting';
import Bowser from 'bowser';

export const AxiosError = (error) => {
  if (typeof error !== typeof undefined) {
    if (typeof error.response !== typeof undefined) {
      let errors = '';
      console.log(error.response.data);
      if (
        error.response.data.message ===
          'Your session has expired. Please log in again.' ||
        error.response.data.message === 'Unauthenticated'
      ) {
        // history.push("/auth/sign-in", { tokenexpiry: "tokenexpired" });
        window.location.href = '/signin';
        return;
      }

      if (
        (error.response !== typeof undefined &&
          error.response.data !== typeof undefined &&
          error.response.data.statuscode === 401 &&
          error.response.data.message ===
            'Your session has expired. Please log in again.') ||
        error.response.data.message === 'Unauthenticated'
      ) {
        // history.push("/auth/sign-in", { tokenexpiry: "tokenexpired" });
        window.location.href = '/signin';
      } else if (
        error.response.data.statuscode === 422 ||
        error.response.data.statuscode === 429
      ) {
        if (error.response.data.message === 'Validation failed') {
          errors = error.response.data.errors;
        } else if (error.response.data.message === 'Invalid request') {
          if (error.response.data.errors != typeof undefined) {
            if (typeof error.response.data.errors === 'object')
              errors = error.response.data.errors;
            else errors = { message: error.response.data.errors };
          } else errors = { message: error.response.data.message };
        } else errors = { message: error.response.data.message };
      } else if (error.response.data.statuscode === 401) {
        if (error.response.data.message === 'Invalid access token') {
          // history.push("/auth/sign-in");
        } else errors = { message: error.response.data.message };
      } else if (typeof error.response !== typeof undefined) {
        // if (error.response.data.statuscode != null)
        // history.push("/errors/error500");
        // ToastError("You can't perform this action at this time");
      } else {
        // history.push("/errors/error500");
      }
      return errors;
    } else {
      // history.push("/errors/error500");
    }
  } else {
    // history.push("/errors/error500");
  }
};

export const getBrowser = () => {
  if (typeof window !== 'undefined') {
    return Bowser.getParser(window.navigator.userAgent)?.parsedResult;
  }
  return null;
};

export const getUserdata = () => {
  if (typeof window !== 'undefined') {
    const userObj = getStorage(initialState.storeKey);
    if (typeof userObj !== typeof undefined) {
      let userData = null;
      if (userObj != null)
        if (userObj.user != null)
          if (userObj.user.userData != null) {
            if (Object.keys(userObj.user.userData).length > 0)
              userData = userObj.user.userData;
          }
      return userData;
    } else {
      return null;
    }
  }
  return null;
};

export const gettwofactorauth = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let twofactor = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null)
          twofactor = userObj.user.userData.two_factor;
    return twofactor === 1 ? true : false;
  }
};

export const validateToken = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let token = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null)
          token = userObj.user.userData.accesstoken;
    return token;
  }
};

export const getusername = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let user_name = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          user_name = userObj.user.userData?.name;
          return user_name;
        } else return user_name;
  }
};

const hexCharacters = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

const getCharacter = (index) => {
  return hexCharacters[index % 16];
};

export const generateNewColor = (userid) => {
  let hexColorRep = '#';
  const randomPosition = Math.floor(130 * hexCharacters.length);
  for (let index = 0; index < 6; index++) {
    hexColorRep += getCharacter(randomPosition + index);
  }
  console.log(randomPosition);
  console.log(hexCharacters);
  console.log(hexCharacters.length);
  console.log(getCharacter(randomPosition));
  console.log(userid);
  console.log(hexColorRep);
  return hexColorRep;
};

export const getuserid = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let user_id = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          user_id = userObj.user.userData?.userid;
          return user_id;
        } else return user_id;
  }
};

export const getprofilepic = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let profile_pic = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          profile_pic = userObj.user.userData?.profile_pic;
          return profile_pic;
        } else return profile_pic;
  }
};

export const getHardcoded_business_type = () => {
  return {
    1: 'Individual',
    2: 'LLP',
    3: 'Partnership',
    4: 'Private Limited',
    5: 'Proprietorship',
    6: 'Society/Trust/Clubs/NGO/Association',
  };
};

export const getHardcoded_services = () => {
  return {
    1: 'DMT',
    2: 'PG Domestic',
    3: 'PG International',
    4: 'Payouts',
    5: 'UPI Collections',
    6: 'Gaming Payouts',
    7: 'Gaming Collections',
    8: 'Bank Account Opening',
  };
};

export const getConfig_business_type = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let business_type = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          business_type = userObj.user.userData?.datas?.config?.business_type;
          return business_type;
        } else return business_type;
  }
};

export const getConfig_user_roles = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let user_roles = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          user_roles = userObj.user.userData?.datas?.config?.user_roles;
          return user_roles;
        } else return user_roles;
  }
};

export const getConfig_business_category = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let business_category = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          business_category =
            userObj.user.userData?.datas?.config?.business_category;
          return business_category;
        } else return business_category;
  }
};

export const getConfig_manage_user_status = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let manage_user_status = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          manage_user_status =
            userObj.user.userData?.datas?.config?.manage_user_status;
          return manage_user_status;
        } else return manage_user_status;
  }
};

export const getConfig_activate_status = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let activate_status = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          activate_status =
            userObj.user.userData?.datas?.config?.activate_status;
          return activate_status;
        } else return activate_status;
  }
};

export const getConfig_services = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let services = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          services = userObj.user.userData?.datas?.config?.services;
          return services;
        } else return services;
  }
};

export const getConfig_settlement_status = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let settlement_status = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          settlement_status =
            userObj.user.userData?.datas?.config?.settlement_status;
          return settlement_status;
        } else return settlement_status;
  }
};

export const getConfig_states = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let states = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          states = userObj.user.userData?.datas?.config?.states;
          return states;
        } else return states;
  }
};

export const getConfig_id_proof = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let id_proof = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          id_proof = userObj.user.userData?.datas?.config?.id_proof;
          return id_proof;
        } else return id_proof;
  }
};

export const getConfig_regist_cert = () => {
  const userObj = getStorage(initialState.storeKey);
  if (typeof userObj !== typeof undefined) {
    let regist_cert = null;
    if (userObj != null)
      if (userObj.user != null)
        if (userObj.user.userData != null) {
          regist_cert = userObj.user.userData?.datas?.config?.regist_cert;
          return regist_cert;
        } else return regist_cert;
  }
};
