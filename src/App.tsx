import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManagePage from "./pages/Manage";
import ManageBookDetailPage from "./pages/ManageBookDetail";
import ManageBookRegisterPage from "./pages/ManageBookRegister";
import SellBookPage from "./pages/SellBook";
import SalesHistoryPage from "./pages/SalesHistory";
import ShoppingPage from "./pages/Shopping";
import SalesHistoryDetailPage from "./pages/SalesHistoryDetail";
import SettingPage from "./pages/Setting";
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

      <Route path="/sell/book/history" element={<SalesHistoryPage />} />

      <Route path="/bookStore" element={<ShoppingPage />} />
      <Route
        path="/sell/book/history/:id"
        element={<SalesHistoryDetailPage />}
      />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
}

export default App;
