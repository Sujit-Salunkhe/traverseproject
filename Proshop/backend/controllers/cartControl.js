import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";

// @ decs create cart Items
// @route  Post/api/cart
// @access Private

const createCartItems = asyncHandler(async (req, res) => {
  const cart = await Cart.deleteOne({ user: req.user._id });

  const newCart = new Cart({
    user: req.user._id,
    cartItems: req.body.cartItems.map((x) => ({
      ...x,
    })),
  });
  await newCart.save();
  res.status(200).json({ message: "Cart created Successfully" });
});

// @ decs get all cart
// @route  get/api/cart
// @access Private

const getCartItems = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.status(202).json(cart.cartItems);
  } else {
    res.status(202).json([]);
  }
});

// @ decs delete all cart
// @route  delete/api/cart
// @access Private
const deleteCartItems = asyncHandler(async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { user: req.user._id },
      { $pull: { cartItems: { _id: req.params.id } } }
    );

    if (updatedCart.nModified > 0) {
      res.status(200).json({ message: "Item removed from cart successfully" });
    } else {
      res.status(404).json({ message: "Item not found in the cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error sujit" });
  }
});

export { createCartItems, getCartItems, deleteCartItems };
// if (cart) {
//     req.body.cartItems.forEach((newItem) => {
//     const existingItem = cart.cartItems.find((item) => item.product.toString() === newItem._id.toString() );
//         if (!existingItem) {
//             cart.cartItems.push({
//                 ...newItem,
//                 _id: undefined,
//                 product: newItem._id,
//             });
//         } else {
//             existingItem.qty += newItem.qty;
//         }
//     })
//     await cart.save()}
//     else{