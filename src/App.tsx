import { useEffect } from "react";
import { initialiseApp } from "./utils/utils";
import { Routes, Route } from "react-router-dom";

import Search from "./components/Search/Search.component";
import Dashboard from "./components/Dashboard/Dashboard.component";

function App() {
  useEffect(() => {
    (async () => { await initialiseApp(); })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;