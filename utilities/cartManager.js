import axios from "axios";
import { AxioseGET, AxiosGET, AxiosMockupGET } from "./axioscall";
import {
  handleSetCategoryInfoStorageItems,
  handleSetColorCodesInfoStorageItems,
  handleSetProductsColorCodesInfoStorageItems,
  handleSetProductsInfoStorageItems,
  handleSetProductsSizeInfoStorageItems,
  handleSetSizeInfoStorageItems,
  handleSetVersionManagerStorageItems,
} from "./storageManager";
import { AK, SK } from "@/lib/api-config";

let cartinfodefalults = {
  cartcount: 0,
  cartquantitycount: 0,
  products: [],
  cartprice: 0,
  subtotal: 0,
  mrptotal: 0,
  shipping: 0,
  ordertotal: 0,
  total: 0,
};
export const handleFetchVersionManagerData = async (setVersionManagerData) => {
  return await AxiosGET(AK.VERSIONMANAGERJSONAPI)
    .then((res) => {
      // console.log("res");
      // console.log(res);
      if (res.data != typeof undefined && res.data != null) {
        setVersionManagerData(res.data);

        return res.data;
      }
    })
    .catch((error) => {
      return null;
    });
};

export const handleFetchCategoryData = async (
  setFormLoader,
  setCategoryListData
) => {
  setFormLoader(true);
  await AxiosGET(AK.CATEGORYJSONAPI)
    .then((res) => {
      if (res.data != typeof undefined && res.data != null) {
        setCategoryListData(res.data);
        handleSetCategoryInfoStorageItems(res.data);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchColorCodesData = async (
  setFormLoader,
  setColorCodesListData
) => {
  setFormLoader(true);

  await AxiosGET(AK.COLORCODESJSONAPI)
    .then((res) => {
      // console.log(res);
      if (res.data != typeof undefined && res.data != null) {
        setColorCodesListData(res.data);
        handleSetColorCodesInfoStorageItems(res.data);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchSizeData = async (setFormLoader, setSizeListData) => {
  setFormLoader(true);

  await AxiosGET(AK.SIZEJSONAPI)
    .then((res) => {
      // console.log(res);
      if (res.data != typeof undefined && res.data != null) {
        setSizeListData(res.data);
        handleSetSizeInfoStorageItems(res.data);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchProductsSizeData = async (
  setFormLoader,
  setProductsSizeListData
) => {
  setFormLoader(true);

  await AxiosGET(AK.PRODUCTSSIZESJSONAPI)
    .then((res) => {
      // console.log(res);
      if (res.data != typeof undefined && res.data != null) {
        setProductsSizeListData(res.data);
        handleSetProductsSizeInfoStorageItems(res.data);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchProductsColorCodesData = async (
  setFormLoader,
  setProductsColorCodesListData
) => {
  setFormLoader(true);

  await AxiosGET(AK.PRODUCTSCOLORCODESJSONAPI)
    .then((res) => {
      // console.log(res);
      if (res.data != typeof undefined && res.data != null) {
        setProductsColorCodesListData(res.data);
        handleSetProductsColorCodesInfoStorageItems(res.data);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchProductsData = async (
  setFormLoader,
  setProductsListData
) => {
  setFormLoader(true);
  const productpayload = {};

  await AxioseGET(AK.ePRODUCTSJSONAPI)
    .then((res) => {
      if (res.data != typeof undefined && res.data != null) {
        let products = res.data;
        if (!localStorage) return;
        const infodata = JSON.parse(localStorage.getItem(SK.CARTINFODATA));
        if (infodata !== null && infodata.products !== null) {
          infodata.products.map((infoprod) => {
            products.filter((prod) => {
              if (prod.id === infoprod.id) {
                prod["addtocart"] = true;
                prod["cartquantity"] = infoprod.cartquantity;
                return true;
              }
              return false;
            });
          });
        }
        setProductsListData(products);
        handleSetProductsInfoStorageItems(products);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleFetchProductsDataSliced = async (
  setFormLoader,
  setProductsListData,
  setProductsListDisplayData,
  productsListDisplayDataCount
) => {
  setFormLoader(true);
  const productpayload = {};

  await AxioseGET(AK.ePRODUCTSJSONAPI)
    .then((res) => {
      if (res.data != typeof undefined && res.data != null) {
        if (!localStorage) return;
        let products = res.data;
        const infodata = JSON.parse(localStorage.getItem(SK.CARTINFODATA));
        if (infodata !== null && infodata.products !== null) {
          infodata.products.map((infoprod) => {
            products.filter((prod) => {
              if (prod.id === infoprod.id) {
                prod["addtocart"] = true;
                prod["cartquantity"] = infoprod.cartquantity;
                return true;
              }
              return false;
            });
          });
        }
        setProductsListData(products);
        setProductsListDisplayData(
          products.slice(0, productsListDisplayDataCount)
        );
        handleSetProductsInfoStorageItems(products);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const updateProductInfoData = async (
  setFormLoader,
  productinfo,
  setProductInfoData
) => {
  setFormLoader(true);
  const productpayload = {};
  if (productinfo != null) {
    if (!localStorage) return;
    const infodata = JSON.parse(localStorage.getItem(SK.CARTINFODATA));
    if (infodata !== null && infodata.products !== null) {
      infodata.products.map((infoprod) => {
        if (productinfo.id === infoprod.id) {
          productinfo["addtocart"] = true;
          productinfo["cartquantity"] = infoprod.cartquantity;
          return true;
        }
        return false;
      });
    }
    setProductInfoData(productinfo);
  }

  await AxioseGET(AK.ePRODUCTSJSONAPI)
    .then((res) => {
      if (res.data != typeof undefined && res.data != null) {
        let products = res.data;
        if (!localStorage) return;
        const infodata = JSON.parse(localStorage.getItem(SK.CARTINFODATA));
        if (infodata !== null && infodata.products !== null) {
          infodata.products.map((infoprod) => {
            products.filter((prod) => {
              if (prod.id === infoprod.id) {
                prod["addtocart"] = true;
                prod["cartquantity"] = infoprod.cartquantity;
                return true;
              }
              return false;
            });
          });
        }
        setProductsListData(products);
        handleSetProductsInfoStorageItems(products);
        setFormLoader(false);
      }
    })
    .catch((error) => {});
};

export const handleSetCartInfoStorageItems = async (cartinfoData) => {
  //console.log(JSON.stringify(cartinfoData));
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  await cartCalculation(cartinfoData);
  if (!localStorage) return;
  localStorage.setItem(SK.CARTINFODATA, JSON.stringify(cartinfoData));
  // localStorage.setItem(SK.NEXTCARTINFODATA, JSON.stringify(cartinfoData));
};

export const handleGetCartInfoStorageItems = async (setCartInfoData) => {
  // localStorage.setItem(SK.CARTINFODATA, JSON.stringify(cartinfoData));
  const items = JSON.parse(localStorage.getItem(SK.CARTINFODATA));
  if (items === null) {
    setCartInfoData({
      cartcount: 0,
      cartquantitycount: 0,
      products: [],
      cartprice: 0,
      subtotal: 0,
      shipping: 0,
      ordertotal: 0,
    });
  } else {
    setCartInfoData(items);
  }
  return items;
  //console.log("setCartInfoData");
  //console.log(JSON.stringify(setCartInfoData));
};

export const handleCartPlus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  product["cartquantity"] = product["cartquantity"] + 1;
  if (
    cartinfoData.products.filter((res) => {
      if (res.id === product.id) {
        res["cartquantity"] = product["cartquantity"];
        return true;
      }
      return false;
    }).length > 0
  ) {
  } else {
    product["cartquantity"] = 1;
    cartinfoData.products.push(product);
  }
  //console.log(JSON.stringify(cartinfoData));
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });
};

export const handleCartMinus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  product["cartquantity"] = product["cartquantity"] - 1;
  if (product["cartquantity"] <= 0) {
    product["addtocart"] = false;
    let cartinfoprod = cartinfoData.products.filter(
      (res) => res.id === product.id
    );
    var index = cartinfoData.products.indexOf(cartinfoprod);
    cartinfoData.products.splice(index, 1);
  } else {
    cartinfoData.products.filter((res) => {
      if (res.id === product.id) {
        res["cartquantity"] = res["cartquantity"] - 1;
        return true;
      }
      return false;
    });
  }
  //console.log(JSON.stringify(cartinfoData));
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });
};

export const handleCartCartInfoPlus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  cartinfoData.products.filter((res) => {
    if (res.id === product.id) {
      res["cartquantity"] = res["cartquantity"] + 1;
      return true;
    }
    return false;
  });
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });
};

export const handleCartCartInfoMinus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  cartinfoData.products.filter((res) => {
    if (res.id === product.id) {
      res["cartquantity"] = res["cartquantity"] - 1;
      if (res["cartquantity"] <= 0) {
        var index = cartinfoData.products.indexOf(product);
        cartinfoData.products.splice(index, 1);
      }
      return true;
    }
    return false;
  });

  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });
};

export const handleProductInfoPlus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  //console.log(JSON.stringify(cartinfoData));
  if (product?.cartquantity == null || product?.cartquantity == undefined) {
    product["cartquantity"] = 1;
  } else {
    product["cartquantity"] = product["cartquantity"] + 1;
  }

  // setCount({ ...count, count: count + 1 });
};

export const handleProductInfoMinus = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  //console.log(JSON.stringify(cartinfoData));
  if (product?.cartquantity == null || product?.cartquantity == undefined) {
    product["cartquantity"] = 0;
  } else {
    product["cartquantity"] = product["cartquantity"] - 1;
  }

  if (
    product?.cartquantity == null ||
    product?.cartquantity == undefined ||
    product["cartquantity"] <= 0
  ) {
    product["addtocart"] = false;
    let cartinfoprod = cartinfoData.products.filter(
      (res) => res.id === product.id
    );
    var index = cartinfoData.products.indexOf(cartinfoprod);
    cartinfoData.products.splice(index, 1);
  } else {
    cartinfoData.products.filter((res) => {
      if (res.id === product.id) {
        res["cartquantity"] = product["cartquantity"];
        return true;
      }
      return false;
    });
  }
  //console.log(JSON.stringify(cartinfoData));
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });

  // setCount({ ...count, count: count + 1 });
};

export const handleProductInfoAddtoCart = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  count
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  // if (product['cartquantity'] <= 0) {
  //   product['addtocart'] = false;
  //   let cartinfoprod = cartinfoData.products.filter(
  //     (res) =>
  //       res.id === product.id &&
  //       res.selectedVariation === product.selectedVariation,
  //   );
  //   var index = cartinfoData.products.indexOf(cartinfoprod);
  //   cartinfoData.products.splice(index, 1);
  // } else {
  //   if (
  //     cartinfoData.products.filter((res) => {
  //       if (
  //         res.id === product.id &&
  //         res.selectedVariation === product.selectedVariation
  //       ) {
  //         res['cartquantity'] = product['cartquantity'];
  //         return true;
  //       }
  //       return false;
  //     }).length === 0
  //   ) {
  //     if (product?.cartquantity === undefined || product['cartquantity'] === 0)
  //       product['cartquantity'] = 1;
  //     cartinfoData.products.push(product);
  //   }
  // }
  cartinfoData.products.push(product);
  //console.log(JSON.stringify(cartinfoData));
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // setCount({ ...count, count: count + 1 });
};

export const handleProductInfoUpdatetoCart = async (
  product,
  setCartInfoData,
  setCount,
  cartinfoData,
  cartquantity,
  count,
  index // Index passed as a parameter
) => {
  if (cartinfoData === null) cartinfoData = cartinfodefalults;

  let updatedProducts = [...cartinfoData.products];

  // Case 1: Remove product if cart quantity is 0 or less
  if (product["cartquantity"] <= 0) {
    product["addtocart"] = false;

    if (index >= 0 && index < updatedProducts.length) {
      updatedProducts.splice(index, 1); // Remove the product using the provided index
    }
  }
  // Case 2: Update or add the product
  else {
    // Check if the product with the same ID and variation exists
    const existingProductIndex = updatedProducts.findIndex(
      (res) =>
        res.id === product.id &&
        res.selectedVariation === product.selectedVariation
    );

    if (existingProductIndex !== -1) {
      // Update existing product's quantity
      updatedProducts[existingProductIndex]["cartquantity"] =
        product["cartquantity"];
    } else {
      // Add new product with default quantity if needed
      if (
        product?.cartquantity === undefined ||
        product["cartquantity"] === 0
      ) {
        product["cartquantity"] = 1;
      }
      updatedProducts.push(product);
    }
  }

  // Update cartinfoData with the new products array
  const updatedCartInfoData = {
    ...cartinfoData,
    products: updatedProducts,
  };

  // Perform calculations and updates
  await cartCalculation(updatedCartInfoData);
  await handleSetCartInfoStorageItems(updatedCartInfoData);

  // Update state and count
  setCartInfoData(updatedCartInfoData);
  setCount({ ...count, count: count + 1 });

  // console.log('******************');
  // console.log(updatedCartInfoData);
};

export const cartCalculation = async (cartinfoData) => {
  let shipping = 0;
  let subtotal = 0;
  let total = 0;
  let totalcartquantity = 0;
  let mrptotal = 0;

  if (cartinfoData === null) cartinfoData = cartinfodefalults;
  // console.log(cartinfoData.products);
  // console.log(cartinfoData.products);
  // console.log(totalcartquantity);
  // console.log(subtotal);
  // console.log(mrptotal);
  // console.log(total);
  cartinfoData.products.map((product) => {
    totalcartquantity =
      Number(totalcartquantity) + Number(product.cartquantity);
    subtotal = subtotal + product.sp * product.cartquantity;
    total = total + product.sp * product.cartquantity;
    mrptotal = mrptotal + product.mrp * product.cartquantity;
  });
  // console.log(cartinfoData.products);
  // console.log(totalcartquantity);
  // console.log(subtotal);
  // console.log(mrptotal);
  // console.log(total);
  cartinfoData.cartcount = cartinfoData.products.length;
  cartinfoData.cartquantity = totalcartquantity;
  cartinfoData.subtotal = subtotal;
  cartinfoData.mrptotal = mrptotal;
  cartinfoData.total = total;
};

export const handleCartRemoveAll = async (
  setCartInfoData,
  clearCartInfoData,
  setCount,
  count
) => {
  let cartinfoData = cartinfodefalults;

  //console.log(JSON.stringify(cartinfoData));
  await cartCalculation(cartinfoData);
  await handleSetCartInfoStorageItems(cartinfoData);
  setCartInfoData(cartinfoData);
  // console.log('******************');
  // console.log(cartinfoData);
  // clearCartInfoData();
  setCount({ ...count, count: count + 1 });
};
