import "./navbar.scss";
import { UserLoginContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
 const setLoggedIn = useContext(UserLoginContext);
  const {isLoggedIn}=props
  const navigate=useNavigate();

  function handleLogOut(){
    setLoggedIn(false)
   navigate("/")
  }

  return (
    <div>
      <ul className="nav">
        <li className="logo">Bio</li>
    {isLoggedIn?<>
        <Link to="/User/Profile">
          <li className="listItem" tabIndex="0">
            Profile
          </li>
        </Link>
        <Link to="/User/Preferences">
          <li className="listItem" tabIndex="0">
            Preferences
          </li>
        </Link>   
        <a> 
          <li
            tabIndex="0"
            className="listItem"
            onClick={handleLogOut}>
            Logout
          </li>
          </a></>:null}
    
      </ul>
    </div>
  );
};

export default Navbar;
