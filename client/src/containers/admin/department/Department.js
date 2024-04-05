import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from "jquery";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ROUTES from "../../../navigations/Routes";
function Department() {
  const tableRef = useRef();
  const [departmentId, setDepartmentId] = useState("");
  const [form, setForm] = useState({
    name: "",
    image: null,
    universityId: null,
  });
  const [formError, setFormError] = useState({
    name: "",
    image: "",
  });
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
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
  useEffect(() => {
    if (departments?.length > 0) {
      $(tableRef.current).DataTable();
    }
  });
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const queryParams = useQuery();
  const changeHandler = (e) => {
    // console.log(e.target.value, e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function editClick() {
    const formDatas = new FormData();
    formDatas.append("name", form.name);
    formDatas.append("image", form.image);
    formDatas.append("_id", departmentId);
    axios.put("http://localhost:8008/dep", formDatas).then((d) => {
      Swal.fire({
        title: "Your Data has been successfuly updated at provided location",
        icon: "success",
      });
      getAll();
    });
  }
  function deleteClick(id) {
    axios.delete("http://localhost:8008/dep?id=" + id).then((d) => {
      Swal.fire({
        text: "Data Deleted Successfuly",
        title: "Data Deleted",
        icon: "success",
      });
      getAll();
    });
  }
  function saveClick() {
    const formDatas = new FormData();
    formDatas.append("name", form.name);
    formDatas.append("image", form.image);
    formDatas.append("universityId", queryParams.get("id"));
    axios.post("http://localhost:8008/dep", formDatas).then((d) => {
      Swal.fire({
        title: "Your Data has reached your location",
        icon: "success",
      });
      setForm({ name: "", image: null });
      getAll();
    });
  }
  function renderTable() {
    return departments?.map((item) => {
      console.log(item);
      return (
        <tr>
          <td className="text-center">
            <img
              src={"http://localhost:8008/" + item.image}
              height="150"
              width="150"
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(120,164,159,1) 7%, rgba(167,230,208,1) 41%, rgba(95,222,228,1) 63%, rgba(0,212,255,1) 63%)",
              }}
            >
              <FaPlus /> Add Product
            </button>
          </td>
          <td>
            <button
              className="text-white col-3"
              onClick={() => {
                setDepartmentId(item._id);
                setForm({ name: item.name });
              }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                borderRadius: "20px",
              }}
            >
              <FaEdit />{" "}
            </button>
          </td>
          <td className="" style={{ position: "relative" }}>
            <button
              className="col-2"
              onClick={() => {
                Swal.fire({
                  title: "Deleting Data",
                  text: "Do You Really Want To delete Data?",
                  buttons: true,
                  icon: "warning",
                }).then(() => {
                  deleteClick(item._id);
                });
              }}
              style={{
                borderRadius:"8px",
                position: "absolute",
                left: "138px",
                top: "43px",
                maxWidth: "100%",
                height: "50%",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(167,230,208,1) 0%, rgba(246,3,72,1) 100%, rgba(0,212,255,1) 100%, rgba(95,222,228,1) 100%)",
              }}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    });
  }
  function onSubmitClick() {
    let errorr = false;
    let error = {
      name: "",
      image: "",
    };
    if (form.name.trim().length == 0) {
      errorr = true;
      error = { ...error, name: "Pls enter name !!!" };
    }
    if (form.image == null) {
      errorr = true;
      error = {
        ...error,
        image: "Pls Select Image !!!",
      };
      console.log(error);
    }
    if (errorr) {
      setFormError(error);
      console.log("formerror:", formError);
    } else {
      setFormError(error);
      departmentId ? editClick() : saveClick();
    }
  }
  return (
    <div>
      <Header />
      <div>
        <div className="row">
          <div class="card text-center mx-auto mt-5">
            <div class="card-header bg-primary text-white">
              {departmentId ? "Update Department" : "New Department"}
            </div>
            <div class="card-body">
              <div className="form-group row">
                <label className="col-lg-4">University Name</label>
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
                <label for="dd" className="col-lg-4">
                  Department Name
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    id="dd"
                    name="name"
                    value={form.name}
                    className="form-control"
                    placeholder="Enter Department Name"
                    onChange={changeHandler}
                  />
                  <p className="text-danger">{formError.name}</p>
                </div>
              </div>
              <div className="form-group row">
                <label for="dd" className="col-lg-4">
                  Department Image
                </label>
                <div className="col-lg-8">
                  <input
                    type="file"
                    // value={form.image}
                    onChange={(e) => {
                      const image = e.target.files[0];
                      // console.log(e.target.files[0]);
                      setForm({ ...form, image: image });
                    }}
                    className="form-control"
                  />
                  <p className="text-danger">{formError.image}</p>
                </div>
              </div>
            </div>
            <div class="card-footer text-body-secondary">
              <button
                onClick={() => {
                  console.log("button daba ta");
                  onSubmitClick();
                }}
                className="btn btn-primary"
              >
                {departmentId ? "EditClick" : "SaveClick"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border m-2 p-2">
        <table
          ref={tableRef}
          id="tblData"
          className="table table-bordered table-striped table-hover"
        >
          <thead>
            <tr>
              <th className="text-center">Department Image</th>
              <th className="text-center">Department Name</th>
              <th className="text-center">Add Product</th>
              <th className="text-center">Edit Department</th>
              <th className="text-center">Delete Department</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
