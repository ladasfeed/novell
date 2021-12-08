import React from "react";
import { Route, Routes } from "react-router-dom";
import { Editor } from "components/pages/editor";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
