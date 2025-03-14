import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import GreenwashingNews from "./GreenwashingNews";
import ChatFeature from "./ChatFeature";
import Blog from "./Blog";
import Cookies from "universal-cookie";
import GreenCheck from "./Greencheck";

const cookies = new Cookies();

const Dashboard = ({ client }) => {
  const navigate = useNavigate();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    navigate("/"); // Redirect to login page after logout
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      {/* Static Sidebar */}
      <Sidebar logout={logout} />

      {/* Dynamic Content */}
      <div className="flex-1 p-0 overflow-y-auto">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="news" element={<GreenwashingNews/>} />
          <Route path="greencheck" element={<GreenCheck />} />
          <Route path="chatfeature" element={<ChatFeature client={client} />} />
          <Route path="blog" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
