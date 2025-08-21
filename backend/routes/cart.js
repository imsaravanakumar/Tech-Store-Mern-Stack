const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// ✅ Get all cart items
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch cart items",
      details: err.message,
    });
  }
});

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { name, color, price, image, quantity } = req.body;

    const newItem = new CartItem({
      name,
      color,
      price,
      image,
      quantity: quantity || 1,
    });

    await newItem.save();
    res.status(201).json({
      message: "Item added to DB cart ✅",
      item: newItem,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add item",
      details: err.message,
    });
  }
});

// ✅ Increase quantity
router.put("/increase/:id", async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.quantity += 1;
    await item.save();

    res.status(200).json({
      message: "Quantity increased ✅",
      item,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to increase quantity",
      details: err.message,
    });
  }
});

// ✅ Decrease quantity (remove if 0)
router.put("/decrease/:id", async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      res.status(200).json({
        message: "Quantity decreased ✅",
        item,
      });
    } else {
      await item.deleteOne();
      res.status(200).json({
        message: "Item removed from DB ✅",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to decrease quantity",
      details: err.message,
    });
  }
});

// ✅ Delete item
router.delete("/delete/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Item deleted from DB cart ✅",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete item",
      details: err.message,
    });
  }
});

// ✅ Clear all cart items
router.delete("/clear", async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.status(200).json({ message: "Cart cleared successfully ✅" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to clear cart",
      details: err.message,
    });
  }
});

module.exports = router;
