import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import LoginComponent from "./LoginComponent";
import CreatePostComponent from "./CreatePostComponent";
import ProfileComponent from "./ProfileComponent";
import withNavigation from "./WithNavigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

class BlogApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: localStorage.getItem("isAuth"),
    };

    this.loginAuth = this.loginAuth.bind(this);
    this.logoutAuth = this.logoutAuth.bind(this);
  }

  loginAuth() {
    this.setState({ isAuth: true });
  }

  logoutAuth() {
    signOut(auth).then(() => {
      localStorage.clear();
      this.setState({ isAuth: false });
      window.location.pathname = "/login";
    });
  }

  render() {
    const LoginComponentWithNav = withNavigation(LoginComponent);
    const CreatePostWithNav = withNavigation(CreatePostComponent);
    const ProfileComponentWithNav = withNavigation(ProfileComponent);

    return (
      <div className="App">
        <Router>

          <nav className="navbar navbar-expand-md navbar-light  navi-bar sticky-top">
            <span className="navbar-brand mb-0 h1">Blog</span>
            <ul className="navbar-nav">
              <li>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {this.state.isAuth && <li>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>}
              {this.state.isAuth && <li>
                <NavLink className="nav-link" to="/createpost">
                  Create Post
                </NavLink>
              </li>}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!this.state.isAuth && (
                <li>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {this.state.isAuth && (
                <li>
                  <button className="btn btn-danger btn-logout" onClick={this.logoutAuth}>
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </nav>



          <Routes>
            <Route path="/" element={<HomeComponent isAuth={this.state.isAuth}/>} />
            <Route
              path="/login"
              element={<LoginComponentWithNav loginAuth={this.loginAuth} />}
            />
            <Route path="/createpost" element={<CreatePostWithNav />} />
            <Route path="/profile" element={<ProfileComponentWithNav />} />
            <Route path="/*" element={<ErrorComponent />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

function ErrorComponent() {
  return (
    <div>
      <h1>Sorry! The page you are looking for does not exist!</h1>
    </div>
  );
}

export default BlogApp;
