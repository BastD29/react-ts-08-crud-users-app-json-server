import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import UserManagement from "./pages/UserManagement";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/:userId" element={<UserManagement />} />
    </Routes>
  );
}
