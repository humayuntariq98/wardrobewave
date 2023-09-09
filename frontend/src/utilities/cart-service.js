import { createOrUpdateCart, destroy as destroyCart } from "./cartApi";
export async function createOrUpdate(userId, product) {
  try {
    const cartRequest = { userId, product };
    const createOrUpdateRes = await createOrUpdateCart(cartRequest);
    return createOrUpdateRes;
  } catch (error) {
    throw new Error(error);
  }
}
export async function destroy(userId) {
  try {
    console.log("userId", userId);
    const destroyRes = await destroyCart(userId);
    if (destroyRes) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
}
