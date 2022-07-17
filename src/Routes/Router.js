import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { AuthLayout } from "../layouts/AuthLayout";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<h1>404 hahaha!</h1>} />

        <Route element={<AuthLayout />}>
          <Route path="/welcome" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
