import { Link, useLocation } from "react-router-dom";

import LogoutIcon from "../assets/logout.png";

const Sidebar = ({ logout }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between h-100%">
      <div>
        <h2 className="text-lg font-bold mb-4">SustainaSphere</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard/home"
              className={`block p-2 rounded ${
                location.pathname.includes("/dashboard/home")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/news"
              className={`block p-2 rounded ${
                location.pathname.includes("/dashboard/news")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📰 News
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/greencheck"
              className={`block p-2 rounded ${
                location.pathname.includes("/dashboard/greencheck")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📊 GreenCheck
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/chatfeature"
              className={`block p-2 rounded ${
                location.pathname.includes("/dashboard/chatfeature")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              💬 GreenConnect
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/blog"
              className={`block p-2 rounded ${
                location.pathname.includes("/dashboard/blog")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📝 GreenWatch Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center p-2 bg-red-600 hover:bg-red-700 rounded"
        >
          <img src={LogoutIcon} alt="Logout" className="w-6 h-6 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
