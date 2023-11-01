import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('token', undefined);

    console.log("INSIDE LOGOUT")
    navigate("/", { replace: true });
  };
  useEffect(() => {

  handleLogout();
    
}, [])
  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return <>Logout Page</>;
};

export default Logout;