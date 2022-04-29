import { Component } from "react";
import { auth, provider } from "../firebase-config";
import {signInWithPopup} from 'firebase/auth';

class LoginComponent extends Component {

  constructor (props){
    super(props);

    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  signInWithGoogle(){
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        this.props.loginAuth();
        this.props.navigate("/");
      })
  }

  render() {

    return (
      <div className="login-component container">
        <p>Sign In with Google to Continue</p>
        <button className="btn btn-success login-with-google" onClick={this.signInWithGoogle}>Sign in with Google</button>
      </div>
    );
  }
}

export default LoginComponent;
