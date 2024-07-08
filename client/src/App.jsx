import TeamBuilder from "./components/teambuilder/TeamBuilderPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/navbar";
import Homepage from "./components/homepage/Homepage";
import RecommendedTeamsPage from "./components/RecPage/recommended";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
        <Route path="/RecPage" element={<RecommendedTeamsPage />} />
        <Route path="/teambuilder/gen6" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen7" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen8" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen9" element={<TeamBuilder />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
