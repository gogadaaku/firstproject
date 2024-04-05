import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import ROUTES from "../../../navigations/Routes";
import { useNavigate } from "react-router-dom";
function University() {
  const [universityId, setUniversityId] = useState(null);
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universities, setUniversities] = useState([]);
const navigate=useNavigate();


  useEffect(() => {
    GetAllUniversities();
  }, []);

  function GetAllUniversities() {
    axios
      .get("http://localhost:8008/uni")
      .then((d) => {
        console.log("all universities:", d.data.univData);
        setUniversities(d.data.univData);
      })
      .catch((e) => {
        console.log({ error: e?.message });
      });
  }

  function SaveUniversity() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      console.log(formData);
      axios
        .post("http://localhost:8008/uni", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((d) => {
          Swal.fire({
            title: "University Saved",
            text: `${d.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          ResetForm();
          GetAllUniversities();
          // window.location.reload();
        });
    } catch (e) {
      console.log({ error: e?.message });
    }
  }
  function UpdateUniversity() {
    try {
      // console.log({ form });
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("_id", universityId);
      axios
        .put("http://localhost:8008/uni", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((d) => {
          Swal.fire({
            title: "University Updated Successfully",
            text: `${d.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          ResetForm();
          GetAllUniversities();
        });
    } catch (e) {
      console.log({ error: e?.message });
      Swal.fire({
        title: "Error",
        text: "An error occurred while saving the university.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  function deleteUniversity(universityId) {
    axios.delete("http://localhost:8008/uni?id=" + universityId).then((d) => {
      Swal.fire({
        title: "University Deleted Successfully",
        text: `${d.data.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      GetAllUniversities();
    });
  }

  function renderTable() {
    return universities?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8008/" + item.image}
              height="150"
              width="150"
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button onClick={()=>{
              navigate(ROUTES.departmentAdmin.name + "?id="+item._id + "&name=" + item.name);
            }}  className="btn btn-info">Add Department</button>
          </td>
          <td>
            <button
              onClick={() => {
                deleteUniversity(item._id);
              }}
              className="btn btn-danger"
            >
              Delete University
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                setUniversityId(item._id);
                setForm({
                  ...form,
                  name: item.name,
                  image: { name: item.image, file: null },
                });
              }}
              className="btn btn-success"
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  }

  function ResetForm() {
    setForm({ name: "", image: null });
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  function saveEdit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Pls Enter University Name" };
    }
    if (form.image == null) {
      errors = true;
      error.image = "Image is required";
    }
    if (errors) {
      setFormError(error);
      return;
    } else {
      setFormError(error);
      universityId ? UpdateUniversity() : SaveUniversity();
    }
  }
  return (
    <div>
      <Header />
      <div className="row">
        <div class="card text-center mx-auto mt-5">
          <div class="card-header bg-info text-white">
            {universityId ? "Update University" : "New University"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label for="u" className="col-lg-4">
                University Name
              </label>
              <div className="col-lg-8">
                <input
                  id="u"
                  value={form.name}
                  name="name"
                  type="text"
                  onChange={changeHandler}
                  className="form-control"
                  placeholder="University Name"
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label for="i" className="col-lg-4">
                University Image
              </label>
              <div className="col-lg-8">
                <input
                  id="i"
                  onChange={(e) => {
                    console.log(e);
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                  type="file"
                  className="form-control"
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button onClick={saveEdit} className="btn btn-info">
              {universityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="border m-2 p-2">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Add Department</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
