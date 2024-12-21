import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <div>
      <nav className="nav-bar">
        <Link to="/" className="site-homepage-link">
          LEVEL LAUNCH
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          {auth.token ? (
            <li>
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
