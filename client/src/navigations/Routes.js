import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/university/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import Support from "../containers/support/Support";
import UserDepartment from "../containers/user/department/UserDepartment";
import Home from "../containers/user/home/Home";
import UserProduct from "../containers/user/product/UserProduct";
import ProductDetail from "../containers/user/productDetails/ProductDetail";

const ROUTES = {
  contact: {
    name: "/contact",
    component: <Contact />,
  },
  about: {
    name: "/about",
    component: <About />,
  },
  support: {
    name: "/support",
    component: <Support />,
  },
  login: {
    name: "/login",
    component: <Login />,
  },
  register: {
    name: "/register",
    component: <Register />,
  },
  universityAdmin: {
    name: "/universityAdmin",
    component: <University />,
  },
  departmentAdmin: {
    name: "/departmentAdmin",
    component: <Department />,
  },
  productAdmin: {
    name: "/productAdmin",
    component: <Product />,
  },
  home: {
    name: "/",
    component: <Home />,
  },
  department: {
    name: "department",
    component: <UserDepartment />,
  },
  product: {
    name: "/product",
    component: <UserProduct />,
  },
  productDetails: {
    name: "/productDetail",
    component: <ProductDetail />,
  },
};
export default ROUTES;
