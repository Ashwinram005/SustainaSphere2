import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import "stream-chat-react/dist/css/v2/index.css"; 

const cookies = new Cookies();
const apiKey = "mx8bjd64rnje";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        {!authToken ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard/home" />} />
            <Route path="/dashboard/*" element={<Dashboard client={client} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
