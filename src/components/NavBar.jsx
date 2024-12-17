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
        <Link to="/">
          <h3>LEVEL LAUNCH</h3>
        </Link>
        <Link to="/about">About</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
