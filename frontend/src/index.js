/* eslint-disable no-unused-vars */
import React from "react";
import { ReactDOM, render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./routes/user";
import Mod from "./routes/mod";
import "./Style.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="User" element={<User />} />
        <Route path="Mod" element={<Mod />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
