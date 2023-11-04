import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCard } from "../../context/cardContext";
import { useAuth } from "../../context/auth";
import UserManu from "./UserManu";

const base = process.env.REACT_APP_BASE_URL;

const UserProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  let temp = null;
  const [product, setProduct] = useState({ _id: "653e94f954fccac9de954835" });
  const [related, setRelated] = useState([]);

  const { auth, setTemp } = useAuth();
  const { card, setCard } = useCard();

  const getSingleProduct = async () => {
    console.log(params);
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/user-product/${params.id}`
      );
      setProduct(data.product);
      console.log("sdfsdf", data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>
        <div className="col-md-9">
          <div className="container mt-4">
            <div className="row">
              {product && (
                <div className="col-md-6  d-flex justify-content-center">
                  <img
                    src={`${base}/api/v1/product/product-photo/${product?._id}`}
                    className="card-img-top card-img"
                    alt="product photo"
                  />
                </div>
              )}
              {product?.name && (
                <div className="col-md-6">
                  <h2 className="text-center mb-3">Product Details</h2>
                  <p className="big-p">Name : {product?.name}</p>
                  <p className="big-p">Description : {product?.description}</p>
                  <p className="big-p">Price : $ {product?.price}</p>
                  <p className="big-p">Category : {product?.category.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetail;
