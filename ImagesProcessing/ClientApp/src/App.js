import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
