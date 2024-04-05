import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function Home() {
  
  const [universities, setUniversities] = useState(null);
  function getAll() {
    axios.get("http://localhost:8008/uni").then((d) => {
      console.log(d.data.univData);
      setUniversities(d.data.univData);
    });
  }
  useEffect(() => {
    getAll();
  }, []);
  const navigate = useNavigate();
  function renderUniversities() {
    return universities?.map((items) => {
      // console.log(items);
      return (
        <div className="col-lg-3">
          <div class="card" style={{ marginTop: "4%" }}>
            <img 
            style={{width:"400px",height:"400px"}}
            
            src={"http://localhost:8008/" + items.image} />
            <div class="card-body">
              <h5 class="card-title">{items.name}</h5>
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate(
                    ROUTES.department.name +
                      "?id=" +
                      items._id +
                      "&name=" +
                      items.name
                  );
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Header />
      
      <div className="row">{renderUniversities()}</div>
    </div>
  );
}

export default Home;
