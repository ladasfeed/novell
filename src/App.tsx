import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Editor } from "components/modules/editor";
import { routes } from "routes";
import { ControlPanel } from "components/modules/panel";

function App() {
  return (
    <div>
      <Routes>
        <Route path={routes.editor} element={<Editor />} />
        <Route path={routes.panel} element={<ControlPanel />} />
      </Routes>
    </div>
  );
}

export default App;
