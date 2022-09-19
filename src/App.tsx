import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManagePage from "./pages/Manage";
import ManageBookDetailPage from "./pages/ManageBookDetail";
import ManageBookRegisterPage from "./pages/ManageBookRegister";

function App() {
  return (
    <Routes>
      <Route path="/manage/book" element={<ManagePage />} />
      <Route path="/manage/book/:isbn" element={<ManageBookDetailPage />} />
      <Route
        path="/manage/book/register"
        element={<ManageBookRegisterPage />}
      />
    </Routes>
  );
}

export default App;
