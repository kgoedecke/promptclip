import "./App.css";
import { useEffect, useState } from "react";
import { initialiseApp } from "./utils/utils";

import Search from "./components/Search/Search.component";
import Dashboard from "./components/Dashboard/Dashboard.component";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    (async () => { await initialiseApp(setShowDashboard); })();
  }, [])

  return (
    <div className="container">
      {showDashboard ? <Dashboard /> : <Search />}
    </div>
  );
}

export default App;
