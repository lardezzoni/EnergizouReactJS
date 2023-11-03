import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem('token', undefined);

    navigate("/", { replace: true });
  };
  useEffect(() => {
  handleLogout();
    
}, [])

  return <>Logout Page</>;
};

export default Logout;