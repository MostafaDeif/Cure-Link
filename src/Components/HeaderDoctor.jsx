import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IconMenu, IconSearch, IconUserCircle } from "./icons";

export default function HeaderDoctor({
  sidebarOpen = false,
  toggleSidebar = () => {},
  onSearchClick = () => {},
  navigateProp,
  profilePath = "/doctor-profile",
  className = "",
  IconMenuComponent,
  IconSearchComponent,
  IconUserCircleComponent,
}) {
  const navigateHook = useNavigate();
  const navigate = navigateProp ?? navigateHook;

  const MenuIcon = IconMenuComponent || IconMenu;
  const SearchIcon = IconSearchComponent || IconSearch;
  const UserIcon = IconUserCircleComponent || IconUserCircle;

  return (
    <header
      className={`bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-40 ${className}`}
    >
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition-transform hover:scale-110"
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>
      )}

      <div className="flex items-center space-x-6 ml-auto">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onSearchClick}
          aria-label="Search"
        >
          <SearchIcon />
        </button>

        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => navigate(profilePath)}
          aria-label="Profile"
        >
          <UserIcon />
        </button>
      </div>
    </header>
  );
}

HeaderDoctor.propTypes = {
  sidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  onSearchClick: PropTypes.func,
  navigateProp: PropTypes.func,
  profilePath: PropTypes.string,
  className: PropTypes.string,
  IconMenuComponent: PropTypes.elementType,
  IconSearchComponent: PropTypes.elementType,
  IconUserCircleComponent: PropTypes.elementType,
};
