import * as productApi from "./productApi";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getProducts() {
  try {
    const data = await productApi.index();
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getProduct(id){
  try {
    const foundProduct = await productApi.detail(id)
    return foundProduct
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}