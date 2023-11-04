const express = require("express");
const formidable = require("express-formidable");

const { signinRequired, isAdmin } = require("../middlewares/authMiddle");
const {
  createProductController,
  getProductController,
  singleProductController,
  getPhotoController,
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
  pandingProductController,
  soldProductController,
} = require("../controllers/productController");

const router = express.Router();

//create product
// router.post(
//   "/create-product",
//   signinRequired,
//   isAdmin,
//   formidable(),
//   createProductController
// );

//create product by user - sell-product
router.post(
  "/sell-product",
  signinRequired,
  formidable(),
  saleProductController
);

//get All product
router.get("/get-product", getProductController);

//get All product for user
router.get("/get-user-product", signinRequired, getUserProductController);

//get single product
router.get("/single-product/:slug", singleProductController);

//get single product of user
router.get("/user-product/:_id", singleUserProductController);

//get product which are not sold yet
router.get("/panding-product", signinRequired, pandingProductController);

//get product which are sold
router.get("/sold-product", signinRequired, soldProductController);

//get photo
router.get("/product-photo/:id", getPhotoController);

// //update product
router.put(
  "/update-product/:id",
  signinRequired,
  formidable(),
  updateProductController
);

//get filter product
router.post("/product-filter", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page - load more feature
router.get("/product-list/:page", productListController);

//search product - filters
router.get("/search/:keyword", searchProductController);

//suggetion of similar product
router.get("/similar-product/:pid/:cid", getSimilarProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//PAYMENT ROUTES

//get token via braintree
router.get("/braintree/token", braintreeTokenController);

//for payment
router.post("/braintree/payment", signinRequired, braintreePatmentController);

module.exports = router;
