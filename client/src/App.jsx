import TeamBuilder from "./components/teambuilder/TeamBuilderPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/navbar";
import Homepage from "./components/homepage/Homepage";
import RecommendedTeamsPage from "./components/RecPage/recommended";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SinglePokemon from "./components/teambuilder/SinglePokemon";
import AccountPage from "./components/Account/Account"

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
        <Route path="/recommendations" element={<RecommendedTeamsPage />} />
        <Route path="/teambuilder/gen6" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen7" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen8" element={<TeamBuilder />} />
        <Route path="/teambuilder/gen9" element={<TeamBuilder />} />
        <Route path="/:id" element={<SinglePokemon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/me" element={<AccountPage />} />
      </Routes>
    </>
  );
}

export default App;
