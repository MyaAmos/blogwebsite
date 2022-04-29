import { Component } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

class Header extends Component {

  constructor (props){
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    signOut(auth).then(() => {
      localStorage.clear();
      this.props.logoutAuth();
      this.props.navigate("/");
    });
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/createpost">
              Create Post
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav navbar-collapse justify-content-end">
          {this.props.isAuth ? (
            <li>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button
                className="btn btn-danger"
                onClick={this.signOut}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Header;
