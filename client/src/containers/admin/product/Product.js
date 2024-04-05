import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from "jquery";

function Product() {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const queryParams = useQuery();
  const [productId, setProductId] = useState("");
  const [form, setForm] = useState({
    name: "",
    images: null,
    description: "",
    price: "",
    qty: 30,
    active: true,
    departmentId: queryParams.get("id"),
  });
  const [products, setProducts] = useState([]);

  function getAll() {
    axios
      .get("http://localhost:8008/prodep?departmentId=" + queryParams.get("id"))
      .then((D) => {
        console.log(D.data);
        setProducts(D.data);
      });
  }

  function saveClick() {
    const formData = new FormData();

    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i], form.images[i].name);
    }

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("qty", form.qty);
    formData.append("price", form.price);
    formData.append("departmentId", form.departmentId);
    formData.append("active", form.active);

    axios
      .post("http://localhost:8008/pro", formData, {
        "content-type": "multipart/form-data",
      })
      .then((D) => {
        console.log(D.data.message);
        getAll();
        window.location.reload();
      });

    setForm({
      name: "",
      description: "",
      qty: "",
      price: "",
      images: null,
    });
  }
  function deleteClick(id) {
    axios.delete("http://localhost:8008/pro?_id=" + id).then((D) => {
      getAll();
      Swal.fire({
        text: "Data Deleted Successfully",
        icon: "success",
      });
    });
  }
  function editClick() {
    const formData = new FormData();

    if (form.images) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      console.log("formdata images:", formData.images);
    } else formData.append("images", null);

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("qty", form.qty);
    formData.append("price", form.price);
    formData.append("_id", productId);
    formData.append("active", form.active);

    axios
      .put("http://localhost:8008/pros", formData, {
        "content-type": "multipart/form-data",
      })
      .then((D) => {
        console.log(D.data.message);
        getAll();
        window.location.reload();
      });
  }

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      var dataTable = $(tableRef.current).DataTable();
    }
  }, [products]);

  const navigate = useNavigate();
  const tableRef = useRef();
  const [formError, setFormError] = useState({
    name: "",
    images: "",
    description: "",
    qty1: "",
    price: "",
  });

  useEffect(() => {
    // console.log(queryParams.get("name"));
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function renderTable() {
    return products?.map((items) => {
      return (
        <tr key={items._id}>
          <td>
            <img
              className="rounded"
              src={"http://localhost:8008/" + items.images[0]}
              height="130"
              width="150"
            />
          </td>
          <td>{items.name}</td>
          <td>{items.description}</td>
          <td>{items.price}</td>
          <td>{items.qty}</td>
          <td>{items.active}</td>
          <td>
            <button
              onClick={() => {
                setProductId(items._id);
                setForm({
                  ...form,
                  name: items.name,
                  description: items.description,
                  qty: items.qty,
                  price: items.price,
                });
                // const imagesArray = [];
                // for (let i = 0; i < items.images.length; i++) {
                //   imagesArray.push(items.images[i]);
                // }
                // console.log(imagesArray);
                // setForm({ ...form, images: imagesArray });
              }}
              className="btn btn-warning mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteClick(items._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  function onSubmitClick() {
    console.log("onSubmitClick button clicked");
    let errors = false;
    let error = {
      name: "",
      qty1: "",
      description: "",
      price: "",
      images: "",
    };
    if (form.name === "") {
      errors = false;
      error = { ...error, name: "pls enter name" };
    }
    if (form.description === "") {
      errors = false;
      error = { ...error, description: "pls enter description" };
    }
    if (form.qty == null || form.qty === "") {
      errors = true;
      error = { ...error, qty1: "invalid quantity" };
    }
    if (form.price == null || form.price === "") {
      errors = true;
      error = { ...error, price: "pls enter price" };
    }
    if (form.images == null && productId == null) {
      errors = true;
      error = { ...error, images: "pls select image!!!" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      productId ? editClick() : saveClick();
    }
  }

  return (
    <div>
      <Header />
      <div className="row">
        <div
          className="card text-center mx-auto mt-5"
          style={{ width: "500px" }}
        >
          <div className="card-header">
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  value={queryParams.get("name")}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Description</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Price</label>
              <div className="col-lg-8">
                <input
                  type="Number"
                  name="price"
                  value={form.price}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Quantity</label>
              <div className="col-lg-8">
                <input
                  type="Number"
                  name="qty"
                  value={form.qty}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.qty1}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Images</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  multiple
                  name="images"
                  className="form-control"
                  onChange={(e) => {
                    console.log(e.target.files);
                    const images = e.target.files;
                    setForm({ ...form, images: images });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button
              onClick={() => {
                console.log("button daba ta");
                Swal.fire({
                  title: "Data Submitting",
                  text: "Submitting Data",
                  icon: "warning",
                }).then(() => {
                  onSubmitClick();
                });
              }}
              style={{
                borderRadius: "8px",
                backgroundColor: "grey",
                color: "white",
              }}
            >
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="bordered mt-4">
        <table
          ref={tableRef}
          className="table table-bordered table-hover table-striped "
        >
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Edit Product</th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
