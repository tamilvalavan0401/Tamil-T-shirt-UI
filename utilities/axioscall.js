"use client";

import axios from "axios";
import {
  getUserdata,
  validateToken,
  getBrowser,
  AxiosError,
  getuserid,
} from "./sessionexpiry";
import { handleGetCartInfoStorageItems } from "./cartManager";
import { AK } from "@/lib/api-config";

let bower = {};
let ipinfo = {};

export const AxiosIPINFO = async () => {
  return axios
    .get(AK.IPINFOURL)
    .then((res) => {
      return res;
    })
    .catch(() => {});
};

const callpageinit = async () => {
  bower = getBrowser();
  ipinfo = await AxiosIPINFO();
};
callpageinit();

export const AxiosPost = async (apiname, payload, checktoken = true) => {
  let token = checktoken ? validateToken() : null;

  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
  payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;
  payload["additional_data"] = getaddtionaldata();
  return axios
    .post(AK.APIURL + apiname, payload, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .catch((error) => {
      return AxiosError(error);
    });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxiosPost_Nocatch = async (
  apiname,
  payload,
  checktoken = true
) => {
  let token = checktoken ? validateToken() : null;

  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
  payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;
  payload["additional_data"] = getaddtionaldata();
  return axios.post(AK.APIURL + apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

const generateHash = async (message) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

function convertToUserAgent(clientData) {
  const browserName = clientData.browser.name;
  const browserVersion = clientData.browser.version;
  const osName = clientData.os.name;
  const osVersion = clientData.os.version;
  const platformType = clientData.platform.type;

  // Creating the user agent string
  const userAgent = `Mozilla/5.0 (${osName} ${osVersion}; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ${browserName}/${browserVersion} Safari/537.36`;

  return userAgent;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const getfbp = () => {
  var cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  var fbpclick = cookies._fbp;
  return fbpclick;
};

export const getfbclid = () => {
  var cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  var fbclick = cookies._fbc;
  return fbclick;
};

export const getaddtionaldata = () => {
  var cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  // console.log("cookies", cookies);
  var additonal_dataclick = cookies.additonal_data;
  return additonal_dataclick;
};

function bkpgetfbclid() {
  if (window.location.href.indexOf("fbclid") > 0) {
    const currentTime = Math.floor(Date.now() / 1000); // Optional: Convert to seconds if needed
    const fbclid = getParameterByName("fbclid", window.location.href);

    // Construct the object and convert it to a JSON string
    console.log(
      JSON.stringify({ fbclid: "fb.1." + currentTime + "." + fbclid })
    );
    const queryString = window.location.search;
    var cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );
    var fbclick = cookies._fbc;
    var fbclick_final = fbclick?.slice(19);
    var fbp = cookies._fbp;
    var ua = window.navigator.userAgent;
    // history.pushState(
    //   {},
    //   null,
    //   queryString + "&fbclid=" + fbclick_final + "&fbp=" + fbp + "ua" + ua
    // );
    return fbp;
  } else {
    return null;
  }
}

const randomSuffix = () => Math.floor(Math.random() * 100000);

export const generateEventID = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const ipInt = ipinfo?.data?.ip
    ? ipToIntUniversal(ipinfo?.data?.ip)
    : randomSuffix();
  return `${ipInt}${timestamp}`;
};

export const ipv6ToBigInt = (ip) => {
  const full = ip
    .replace(/::/, ":" + "0:".repeat(8 - ip.split(":").length + 1))
    .split(":")
    .map((h) =>
      parseInt(h || "0", 16)
        .toString(16)
        .padStart(4, "0")
    )
    .join("");

  return BigInt("0x" + full);
};

export const ipv4ToInt = (ip) => {
  return (
    ip
      .split(".")
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
  );
};

export const ipToIntUniversal = (ip) => {
  if (ip.includes(".")) {
    return ipv4ToInt(ip); // returns Number
  } else if (ip.includes(":")) {
    return ipv6ToBigInt(ip); // returns BigInt
  }
  return null;
};

export const FBConversionPUSH = async (
  event,
  order_id = "",
  univ_eventid = ""
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };
  const event_id = univ_eventid || generateEventID();
  const utcTimestampInSeconds = Math.floor(Date.now() / 1000);
  let cartdata = {};

  cartdata = await handleGetCartInfoStorageItems((data) => {
    // console.log(data);
    // console.log(data?.products?.length);
    return data;
  });

  let data = [];
  let additional_data_obj = {};
  try {
    additional_data_obj = JSON.parse(await getaddtionaldata());
    // console.log(additional_data_obj);
  } catch (e) {
    console.log(e);
  }
  // console.log(cartdata?.products?.length);
  if (!cartdata?.products?.length) {
    data.push({
      event_name: event?.name,
      event_time: utcTimestampInSeconds,
      event_id: event_id,
      action_source: "website",
      attribution_data: {
        ad_id: additional_data_obj?.utm_id,
        adset_id: additional_data_obj?.utm_term,
        campaign_id: additional_data_obj?.utm_content,
      },
      opt_out: false,
      user_data: {
        em: [await generateHash(getUserdata()?.email)],
        ph: [await generateHash(getUserdata()?.mobile)],
        client_ip_address: ipinfo?.data?.ip,
        client_user_agent: convertToUserAgent(bower),
        fbc: getfbclid(),
        fbp: getfbp(),
      },
      custom_data: {
        additional_data: getaddtionaldata(),
        currency: "INR",
        order_id: order_id,
        user_id: getuserid(),
      },
      data_processing_options: ["LDU"],
      data_processing_options_country: 1,
      data_processing_options_state: 1000,
    });
  } else {
    data = await Promise.all(
      cartdata?.products?.map(async (_cartdata) => ({
        event_name: event?.name,
        event_time: utcTimestampInSeconds,
        event_id: event_id,
        action_source: "website",
        attribution_data: {
          ad_id: additional_data_obj?.utm_id,
          adset_id: additional_data_obj?.utm_term,
          campaign_id: additional_data_obj?.utm_content,
        },
        opt_out: false,
        user_data: {
          em: [await generateHash(getUserdata()?.email)],
          ph: [await generateHash(getUserdata()?.mobile)],
          client_ip_address: ipinfo?.data?.ip,
          client_user_agent: convertToUserAgent(bower),
          fbc: getfbclid(),
          fbp: getfbp(),
        },
        custom_data: {
          additional_data: getaddtionaldata(),
          currency: "INR",
          value: cartdata?.total,
          content_name: _cartdata?.category_name,
          content_category: _cartdata?.category_name,
          content_ids: [_cartdata?.esin],
          contents: [
            {
              id: _cartdata?.esin,
              quantity: _cartdata?.cartquantity,
              item_price: _cartdata?.sp,
            },
          ],
          content_type: "product",
          order_id: order_id,
          user_id: getuserid(),
          num_items: _cartdata.cartcount,
          search_string: _cartdata?.name,
          status: "completed",
          delivery_category: "in_store",
        },
        data_processing_options: ["LDU"],
        data_processing_options_country: 1,
        data_processing_options_state: 1000,
      })) || []
    );
  }

  const raw = JSON.stringify({
    data: data,
  });

  return axios
    .post(AK.APIURL + AK.FBCONVERSIONPUSHAPI, raw, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {});
};

export const axiosSetWishlist = async (id, navigate) => {
  let token = true ? validateToken() : null;

  if (token === null) {
    navigate("/signin");
  }

  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const payload = {
    productid: id.toString(),
  };

  payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
  payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;

  return axios
    .post(AK.APIURL + AK.WISHLISTPUSHAPI, payload, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {});
};

export const axiosGetWishlist = async (setproductwishlistData) => {
  let token = true ? validateToken() : null;

  if (token !== null) {
    const headers = {
      accesskey: AK.ACCESSKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {};

    payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
    payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;

    return axios
      .post(AK.APIURL + AK.WISHLISTFETCHAPI, payload, {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((res) => {
        console.log(res);
        setproductwishlistData(res?.data?.wishlist);
        return res?.data?.wishlist;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const axiosGetOverallProductRatings = async (
  setproductoverallratingData
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  const payload = {};

  payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
  payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;

  return axios
    .post(AK.APIURL + AK.OVERALLPRODUCTSRATINGAPI, payload, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      // console.log(res)
      // setproductwishlistData(res?.data?.wishlist)
      setproductoverallratingData(res?.data?.products);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const axiosGetProductReviews = async (
  id,
  setproductaveragerating,
  setproductreviewList
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  const payload = {
    productid: id,
  };

  payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
  payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;

  return axios
    .post(AK.APIURL + AK.PRODUCTREVIEWSFETCHAPI, payload, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      console.log(res);
      setproductaveragerating(res?.data?.average_rating);
      setproductreviewList(res?.data?.reviews);
      // setproductwishlistData(res?.data?.wishlist)
    })
    .catch((error) => {});
};

export const axiosSetProductReviews = async (id, rating, comment, files) => {
  let token = true ? validateToken() : null;

  if (token !== null) {
    const headers = {
      accesskey: AK.ACCESSKEY,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("storeid", process.env.NEXT_PUBLIC_STORE_ID);
    formData.append("storecode", process.env.NEXT_PUBLIC_STORE_CODE);
    formData.append("productid", id);
    formData.append("comment", comment);
    if (files?.length > 0)
      files.forEach((file, index) => {
        formData.append(`files[]`, file);
      });

    return await axios
      .post(AK.APIURL + AK.PRODUCTREVIEWSPUSHAPI, formData, {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then(async (res) => {
        console.log(res);
        return res;
        // setproductaveragerating(res?.data?.average_rating)
        // setproductreviewList(res?.data?.reviews)
        // setproductwishlistData(res?.data?.wishlist)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
};

export const axiosClearWishlist = async (id) => {
  let token = true ? validateToken() : null;

  if (token !== null) {
    const headers = {
      accesskey: AK.ACCESSKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      productid: id.toString(),
    };

    payload["storeid"] = process.env.NEXT_PUBLIC_STORE_ID;
    payload["storecode"] = process.env.NEXT_PUBLIC_STORE_CODE;

    return axios
      .post(AK.APIURL + AK.WISHLISTCLEARAPI, payload, {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  }
};

export const AxiosDirectPost = async (apiurl, payload, checktoken = true) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  return axios.post(apiurl, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxiosInstamojoDirectPost = async (
  apiurl,
  payload,
  checktoken = true
) => {
  const headers = {
    "X-Api-Key": "test_a15356a96ae27ef4d454f525d56",
    "X-Auth-Token": "test_a3ea1ff9524f246b516b0a9ea36",
  };

  return axios.post(apiurl, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxiosGET = async (
  apiname,
  payload,
  history,
  checktoken = true
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  return axios.get(AK.APIURL + apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxioseGET = async (
  apiname,
  payload,
  history,
  checktoken = true
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  return axios.get(apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxiosMockupGET = async (
  apiname,
  payload,
  history,
  checktoken = true
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  return axios.get(AK.MOCKUPSURL + apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const ReddisAxiosGET = async (
  apiname,
  payload,
  history,
  checktoken = true
) => {
  const headers = {
    accesskey: AK.ACCESSKEY,
    "Content-Type": "application/json",
  };

  return axios.get(AK.REDDISAPIURL + apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};

export const AxiosFilePost = async (
  apiname,
  payload,
  history,
  checktoken = true
) => {
  let token = checktoken ? validateToken(history) : null;
  const headers = {
    accesskey: AK.ACCESSKEY,
    accesstoken: token,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  };

  return await axios.post(AK.APIURL + apiname, payload, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  // .then((res) => {
  //   if (res != typeof undefined && res.data != typeof undefined) {
  //     return res.data;
  //   }
  // })
  // .catch((error) => {
  //   return AxiosError(history, error);
  // });
};
