import TeamBuilder from "./components/teambuilder/TeamBuilderPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/navbar";
import Homepage from "./components/homepage/Homepage";
import RecommendedTeamsPage from "./components/RecPage/recommended";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/teambuilder/gen1" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen2" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen3" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen4" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen5" element={<TeamBuilder />} />
        <Route path="/RecPage" element={<RecommendedTeamsPage/>} />
      </Routes>
    </>
  );
}

export default App;
