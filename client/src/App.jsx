import Pokemon from "./components/teambuilder/Pokemon";
import TeamBuilder from "./components/teambuilder/TeamBuilderPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/navbar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/teambuilder/gen1" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen2" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen3" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen4" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen5" element={<TeamBuilder />} />
        <Route path="/" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
