import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManagePage from "./pages/Manage";
import ManageBookDetailPage from "./pages/ManageBookDetail";
import ManageBookRegisterPage from "./pages/ManageBookRegister";
import SellBookPage from "./pages/SellBook";
function App() {
  return (
    <Routes>
      <Route path="/manage/book" element={<ManagePage />} />
      <Route path="/manage/book/:isbn" element={<ManageBookDetailPage />} />
      <Route
        path="/manage/book/register"
        element={<ManageBookRegisterPage />}
      />
      <Route path="/sell/book" element={<SellBookPage />} />
    </Routes>
  );
}

export default App;
