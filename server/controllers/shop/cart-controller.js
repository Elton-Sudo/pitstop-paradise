const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, selectedFlavor, guestId } = req.body;
    
    if ((!userId && !guestId) || !productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid data provided!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const cartOwnerId = userId || guestId;
    let cart = await Cart.findOne({ userId: cartOwnerId });
    
    if (!cart) {
      cart = new Cart({ userId: cartOwnerId, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.selectedFlavor === selectedFlavor);

    if (productIndex === -1) {
      cart.items.push({ productId, quantity, selectedFlavor });
    } else {
      cart.items[productIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


const fetchCartItems = async (req, res) => {
  try {
    const { userId, guestId } = req.params;

    if (!userId && !guestId) {
      // Handle cart retrieval from localStorage (front-end) for guests if using client storage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      return res.status(200).json({ success: true, data: guestCart });
    }

    const cart = await Cart.findOne({ userId: userId || guestId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!" });
    }

    const validItems = cart.items.filter(item => item.productId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedItems = validItems.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      selectedFlavor: item.selectedFlavor,
    }));

    res.status(200).json({ success: true, data: { ...cart._doc, items: populatedItems } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      selectedFlavor: item.selectedFlavor, 
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
