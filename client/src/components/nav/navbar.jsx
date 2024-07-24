import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  //waiting for links to be created
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to={"/"}>Change Gen</Link>
          <img
            className="pokeball1"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplsk-0dbf698c-0e7e-4a24-867e-94c4dcd2a908.png/v1/fill/w_894,h_894/grass_type_symbol_tcg_herbal_energy_by_jormxdos_dgrplsk-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzay0wZGJmNjk4Yy0wZTdlLTRhMjQtODY3ZS05NGM0ZGNkMmE5MDgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-T6zF7toCAxhfrWGKz_ALZX_zs37b0LKd_NwSUv38N4"
          ></img>
        </li>
        <li>
          <Link to="/recommendations">Recommended Teams</Link>
          <img
            className="pokeball1"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrpls3-f1437ad4-36e6-443e-abac-232d22cdf818.png/v1/fill/w_894,h_894/water_type_symbol_tcg_splash_energy_by_jormxdos_dgrpls3-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzMy1mMTQzN2FkNC0zNmU2LTQ0M2UtYWJhYy0yMzJkMjJjZGY4MTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.mB2dfG53sPzWFy7hy-tAYWDSo16A-86-svLIOSoooUE"
          ></img>
        </li>

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplrj-2dfc75ad-1f51-4dca-80d8-1c4e2f80d1a5.png/v1/fill/w_894,h_894/fire_type_symbol_tcg_burning_energy_by_jormxdos_dgrplrj-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxyai0yZGZjNzVhZC0xZjUxLTRkY2EtODBkOC0xYzRlMmY4MGQxYTUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.QKcNrUhikvZmIJ7TSS1ucOQgmjFgpmKakkniBRePy9Q"
              ></img>
            </li>
            <li>
              <Link to="/register">Register</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplsy-202f52c7-74c2-451b-9e32-c6062e3479d4.png/v1/fill/w_894,h_894/lighting_type_symbol_tcg_flash_energy_by_jormxdos_dgrplsy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzeS0yMDJmNTJjNy03NGMyLTQ1MWItOWUzMi1jNjA2MmUzNDc5ZDQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7BCCxc-7zQs2J7YRj0vu2QZODuyCvGL6avn2-0myNIc"
              ></img>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"auth/me"}>Account</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplto-2bbbdb45-f2fd-49a6-8a8c-9170fa40f577.png/v1/fill/w_894,h_894/psychic_type_symbol_tcg_mystery_energy_by_jormxdos_dgrplto-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGx0by0yYmJiZGI0NS1mMmZkLTQ5YTYtOGE4Yy05MTcwZmE0MGY1NzcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tGu7ir3dKY3R_41lHwdQwd2ARk28OmAH0aLwq55pOGE"
              ></img>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              Logout
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrpltb-53510688-3d98-4b23-a70d-fd8c9eb3c8cb.png/v1/fill/w_894,h_894/fighting_type_symbol_tcg_strong_energy_by_jormxdos_dgrpltb-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGx0Yi01MzUxMDY4OC0zZDk4LTRiMjMtYTcwZC1mZDhjOWViM2M4Y2IucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zxzLQyyN0POhPd5WYtkFX-dI3p_8Jyqre8fHqvmfqRY"
              ></img>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  //waiting for links to be created
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to={"/"}>Change Gen</Link>
          <img
            className="pokeball1"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplsk-0dbf698c-0e7e-4a24-867e-94c4dcd2a908.png/v1/fill/w_894,h_894/grass_type_symbol_tcg_herbal_energy_by_jormxdos_dgrplsk-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzay0wZGJmNjk4Yy0wZTdlLTRhMjQtODY3ZS05NGM0ZGNkMmE5MDgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-T6zF7toCAxhfrWGKz_ALZX_zs37b0LKd_NwSUv38N4"
          ></img>
        </li>
        <li>
          <Link to="/recommendations">Recommended Teams</Link>
          <img
            className="pokeball1"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrpls3-f1437ad4-36e6-443e-abac-232d22cdf818.png/v1/fill/w_894,h_894/water_type_symbol_tcg_splash_energy_by_jormxdos_dgrpls3-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzMy1mMTQzN2FkNC0zNmU2LTQ0M2UtYWJhYy0yMzJkMjJjZGY4MTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.mB2dfG53sPzWFy7hy-tAYWDSo16A-86-svLIOSoooUE"
          ></img>
        </li>

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplrj-2dfc75ad-1f51-4dca-80d8-1c4e2f80d1a5.png/v1/fill/w_894,h_894/fire_type_symbol_tcg_burning_energy_by_jormxdos_dgrplrj-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxyai0yZGZjNzVhZC0xZjUxLTRkY2EtODBkOC0xYzRlMmY4MGQxYTUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.QKcNrUhikvZmIJ7TSS1ucOQgmjFgpmKakkniBRePy9Q"
              ></img>
            </li>
            <li>
              <Link to="/register">Register</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplsy-202f52c7-74c2-451b-9e32-c6062e3479d4.png/v1/fill/w_894,h_894/lighting_type_symbol_tcg_flash_energy_by_jormxdos_dgrplsy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGxzeS0yMDJmNTJjNy03NGMyLTQ1MWItOWUzMi1jNjA2MmUzNDc5ZDQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7BCCxc-7zQs2J7YRj0vu2QZODuyCvGL6avn2-0myNIc"
              ></img>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"auth/me"}>Account</Link>
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrplto-2bbbdb45-f2fd-49a6-8a8c-9170fa40f577.png/v1/fill/w_894,h_894/psychic_type_symbol_tcg_mystery_energy_by_jormxdos_dgrplto-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGx0by0yYmJiZGI0NS1mMmZkLTQ5YTYtOGE4Yy05MTcwZmE0MGY1NzcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tGu7ir3dKY3R_41lHwdQwd2ARk28OmAH0aLwq55pOGE"
              ></img>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              Logout
              <img
                className="pokeball1"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgrpltb-53510688-3d98-4b23-a70d-fd8c9eb3c8cb.png/v1/fill/w_894,h_894/fighting_type_symbol_tcg_strong_energy_by_jormxdos_dgrpltb-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGdycGx0Yi01MzUxMDY4OC0zZDk4LTRiMjMtYTcwZC1mZDhjOWViM2M4Y2IucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zxzLQyyN0POhPd5WYtkFX-dI3p_8Jyqre8fHqvmfqRY"
              ></img>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;