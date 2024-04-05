import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
function UserDepartment() {
  const navigate = useNavigate();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const queryParams = useQuery();
  const [departments, setDepartments] = useState(null);
  function getAll() {
    axios
      .get("http://localhost:8008/depuni?uniId=" + queryParams.get("id"))
      .then((d) => {
        console.log("ye data aa gya yeee:", d.data.message);
        setDepartments(d.data.message);
      });
  }
  useEffect(() => {
    getAll();
  }, []);
  function renderDepartments() {
    return departments?.map((items) => {
      return (
        <div class="card col-lg-3">
          <img
            class="card-img-top"
            src={"http://localhost:8008/" + items.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{items.name}</h5>

            <button
              onClick={() => {
                navigate(ROUTES.product.name + "?id=" + items._id);
              }}
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Header />
      <div>
        <h2 className="text-primary mt-4">{queryParams.get("name")}</h2>
      </div>
      <div className="row">{renderDepartments()}</div>
    </div>
  );
}

export default UserDepartment;
