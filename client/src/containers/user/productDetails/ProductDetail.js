import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
function ProductDetail() {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const [product, setProduct] = useState(null);
  const queryParams = useQuery();
  function getAll() {
    axios
      .get("http://localhost:8008/prod?_id=" + queryParams.get("id"))
      .then((d) => {
        console.log(d.data.proData);
        setProduct(d.data.proData);
      });
  }
  useEffect(() => {
    getAll();
  }, []);
  function renderProduct() {
    console.log("ye baat:", product);
    return product?.images?.map((items) => {
      console.log(items);
      return (
        <div className="col-lg-2">
          <img
            class="card-img-top"
            src={"http://localhost:8008/" + items}
            alt="Card image cap"
            height="140"
            width="130"
          />
        </div>
      );
    });
  }

  return (
    <div>
      <Header />
      <div>
        <h2 className="text-primary">{queryParams.get("name")}</h2>
        <div>
          <div class="card col-lg-7 mx-auto">
            <div className="d-flex justify-content-evenly p-5">
              {renderProduct()}
            </div>
            <div class="card-body">
              <div className="form-group row">
                <label className="col-lg-4">Product Name</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value={product && product.name}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4">Description</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value={product && product.description}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4">Product Price</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value={product && product.price}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-4">Product Quantity</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    disabled
                    value={product && product.qty}
                  />
                </div>
              </div>
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
