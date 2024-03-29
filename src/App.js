import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/core.css";
import "./assets/css/demo.css";
import "./assets/css/theme-default.css";
import "./assets/css/custom.css";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Products from "./pages/products";
import Categories from "./pages/categories";
import PrivateRoute from "./routes/PrivateRoute";

import Orders from "./pages/orders.js";
import GetOneOrders from "./pages/orders/getOneOrders.js";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Products />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="orders/:id" element={<GetOneOrders />}></Route>
        </Route>
      </Route>
      <Route
        path={"*"}
        element={
          <Link to={"/"}>
            <h1>Back to home</h1>
          </Link>
        }
      />
    </Routes>
  );
}

export default App;
