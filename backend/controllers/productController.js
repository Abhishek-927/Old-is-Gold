const { validationResult } = require("express-validator");
const braintree = require("braintree");
const fs = require("fs");
const slugify = require("slugify");

//file imports
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const orderModel = require("../models/orderModel");
const User = require("../models/User");

let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//creating product
// const createProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.files;
//     switch (true) {
//       case !name:
//         return res.status(401).json({ msg: "name required" });
//       case !description:
//         return res.status(401).json({ msg: "description required" });
//       case !price:
//         return res.status(401).json({ msg: "price required" });
//       case !category:
//         return res.status(401).json({ msg: "category required" });
//       case !quantity:
//         return res.status(401).json({ msg: "quantity required" });
//     }

//     if (!photo || photo.size > 1000000) {
//       return res.status(401).json({
//         msg: "photo is required and At most 1 MB",
//       });
//     }

//     const product = new productModel({
//       ...req.fields,
//       slug: slugify(name),
//     });
//     if (photo) {
//       product.photo.data = fs.readFileSync(photo.path);
//       product.photo.contentType = photo.type;
//     }
//     await product.save();

//     res.status(201).json({
//       success: true,
//       msg: "product created successful",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       msg: "error inside creating product",
//       error,
//     });
//   }
// };

//create product by user
const saleProductController = async (req, res) => {
  try {
    const { name, description, price, category } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(401).json({ msg: "name required" });
      case !description:
        return res.status(401).json({ msg: "description required" });
      case !price:
        return res.status(401).json({ msg: "price required" });
      case !category:
        return res.status(401).json({ msg: "category required" });
    }

    if (!photo || photo.size > 1000000) {
      return res.status(401).json({
        msg: "photo is required and At most 1 MB",
      });
    }

    const product = new productModel({
      ...req.fields,
      creater: req.user._id,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).json({
      success: true,
      msg: "product created successful",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside creating product",
      error,
    });
  }
};

//get all product
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    res.send({
      success: true,
      totalCount: products.length,
      msg: "All product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting All product",
      error,
    });
  }
};

//get all product for user
const getUserProductController = async (req, res) => {
  try {
    console.log(req.user);
    const products = await productModel
      .find({ creater: req.user._id })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    res.send({
      success: true,
      totalCount: products.length,
      msg: "All product of user",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting All product of user",
      error,
    });
  }
};

//get all product which not sold
const pandingProductController = async (req, res) => {
  try {
    console.log(req.user);
    const products = await productModel
      .find({ creater: req.user._id, sold: false })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    console.log(products);
    res.send({
      success: true,
      totalCount: products.length,
      msg: "All product of user",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting All product of user",
      error,
    });
  }
};

//get all product which sold
const soldProductController = async (req, res) => {
  try {
    console.log(req.user);
    const products = await productModel
      .find({ creater: req.user._id, sold: true })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    console.log(products);
    res.send({
      success: true,
      totalCount: products.length,
      msg: "All product of user",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting All product of user",
      error,
    });
  }
};

//get single user product
const singleUserProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params._id })
      .select("-photo")
      .populate("category");
    res.send({
      success: true,
      msg: "one product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting single product",
      error,
    });
  }
};

//get single product
const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.send({
      success: true,
      totalCount: product?.length,
      msg: "one product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting single product",
      error,
    });
  }
};

//get photo product
const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");

    if (product && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.send(product.photo.data);
    } else {
      res.send("photo not available");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting single product",
      error,
    });
  }
};

//update product
const updateProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        sold: true,
      },
      { new: true }
    );
    await product.save();

    res.status(201).json({
      success: true,
      msg: "product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside update product",
      error,
    });
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      msg: "delete done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside getting single product",
      error,
    });
  }
};

//filter product
const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked?.length > 0) {
      args.category = checked;
    }
    if (radio?.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const product = await productModel.find(args);

    res.send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error inside filter product",
      error,
    });
  }
};

//count number of product
const productCountController = async (req, res) => {
  try {
    const count = await productModel.find({}).estimatedDocumentCount();
    res.send({
      success: true,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in product count",
      error,
    });
  }
};

//pagination logic
const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page || 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createAt: -1 });
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in per page",
      error,
    });
  }
};

//search product - keyword search
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in search product",
      error,
    });
  }
};

//get similar product
const getSimilarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in getting releted product",
      error,
    });
  }
};

//get single category
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");

    res.json({
      success: true,
      products,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in getting product category",
      error,
    });
  }
};

//get token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
const braintreePatmentController = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    const { selectedProduct, nonce } = req.body;
    console.log(selectedProduct);
    let total = selectedProduct.price;
    let newTransection = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          const order = new orderModel({
            products: selectedProduct,
            payment: result,
            buyer: {
              name: user.name,
              _id: user._id,
            },
          });
          await order.save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "internal server error",
      error,
    });
  }
};

module.exports = {
  singleProductController,
  getProductController,
  getPhotoController,
  pandingProductController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  getSimilarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePatmentController,
  saleProductController,
  getUserProductController,
  singleUserProductController,
  soldProductController,
};
