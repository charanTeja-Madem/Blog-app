import React from 'react'
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from '../styles/common'
import { useAuth } from '../../store/authStore'

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentuser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Successfully logged out");
    navigate("/login");
  };

  // decide profile route based on role
  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Profile Image */}
        {isAuthenticated && user?.profileImageUrl && (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#c0392b]"
          />
        )}

        {/* Brand */}
        <NavLink to="/" className={navBrandClass}>
          Literary Journal
        </NavLink>

        {/* Nav Links */}
        <ul className={navLinksClass}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
            >
              Home
            </NavLink>
          </li>

          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/articles"
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Articles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button className={navLinkClass} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header