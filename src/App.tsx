import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Editor } from "components/modules/editor";
import { routes } from "routes";
import { ControlPanel } from "components/modules/panel";
import { Preview } from "components/modules/engine";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path={routes.editor}
          element={
            <>
              <Editor /> <Preview />
            </>
          }
        />
        <Route path={routes.panel} element={<ControlPanel />} />
      </Routes>
    </div>
  );
}

export default App;
