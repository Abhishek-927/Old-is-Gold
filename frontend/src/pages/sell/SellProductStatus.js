import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserManu from "../user/UserManu";
import SpinnerOnly from "../../components/SpinnerOnly";

const base = process.env.REACT_APP_BASE_URL;

const SellProductStatus = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get(
      //   `${base}/api/v1/product/get-user-product`
      // );

      const { data } = await axios.get(
        `${base}/api/v1/product/panding-product/`
      );
      console.log(data);
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="container-fluid my-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserManu />
        </div>

        <div className="col-md-9">
          {loading ? (
            <SpinnerOnly />
          ) : (
            <div className="container">
              <div className="d-flex flex-wrap gap-25px">
                {products.map((pro) => {
                  return (
                    <div key={pro._id}>
                      <Link
                        to={`/user-product/${pro._id}`}
                        className=" card-header"
                      >
                        <div className="card">
                          <img
                            src={`${base}/api/v1/product/product-photo/${pro._id}`}
                            className="card-img-top card-img"
                            alt="product photo"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{pro.name}</h5>
                            <p className="card-text">
                              {pro.description.slice(0, 35)}...
                            </p>
                            <p className="card-text">Price - $ {pro.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProductStatus;
