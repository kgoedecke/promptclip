import { useEffect, useState } from "react";
import { initialiseApp, switchToApp, switchToDashboard } from "./utils/utils";

import Search from "./components/Search/Search.component";
import Dashboard from "./components/Dashboard/Dashboard.component";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    (async () => { await initialiseApp(setShowDashboard); })();
  }, [])

  useEffect(() => {
      showDashboard ? switchToDashboard() : switchToApp();
  }, [showDashboard])

  return (
    <div className="container">
      {showDashboard ? <Dashboard /> : <Search />}
    </div>
  );
}

export default App;
