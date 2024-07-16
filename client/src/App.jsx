import TeamBuilder from "./components/teambuilder/TeamBuilderPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/navbar";
import Homepage from "./components/homepage/Homepage";
import RecommendedTeamsPage from "./components/RecPage/recommended";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SinglePokemon from "./components/teambuilder/SinglePokemon";
import AccountPage from "./components/Account/Account";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/teambuilder/gen/:genId" element={<TeamBuilder />} />
        <Route path="/recommendations" element={<RecommendedTeamsPage />} />
        <Route path="/gen/:genId/:id" element={<SinglePokemon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/me" element={<AccountPage />} />
      </Routes>
    </>
  );
}

export default App;
