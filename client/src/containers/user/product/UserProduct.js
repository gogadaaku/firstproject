import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function UserProduct() {
  const navigate = useNavigate();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const queryParams = useQuery();
  const [products, setProducts] = useState(null);

  function getAll() {
    axios
      .get("http://localhost:8008/prodep?departmentId=" + queryParams.get("id"))
      .then((D) => {
        console.log("data aa gya:", D.data);
        setProducts(D.data);
      });
  }

  useEffect(() => {
    getAll();
  }, []);

  function renderProducts() {
    return products?.map((items) => {
      return (
        <div class="card col-lg-4 ">
          <div>
            <img
              className="card-img-top"
              style={{ width: "400px", height: "400px" }}
              src={"http://localhost:8008/" + items.images[0]}
              alt="Card image cap"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{items.name}</h5>

            <button
              onClick={() => {
                navigate(
                  ROUTES.productDetails.name +
                    "?id=" +
                    items._id +
                    "&name=" +
                    items.name
                );
              }}
              class="btn btn-primary"
            >
              View Detail
            </button>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Header />
      <div className="row">{renderProducts()}</div>
    </div>
  );
}

export default UserProduct;
