import { Component } from "react";
import { db, auth, provider } from "../firebase-config";
import {signInWithPopup} from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

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
        this.docExists();
        this.props.navigate("/");
      })

  }


  async docExists() {
    const docRef = doc(db, "users", auth.currentUser.displayName);
    const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document! Creating document...");
        this.createPost(docRef);
      }
  }

  async createPost(docRef) {
    await setDoc(docRef, {
      description: ""
    });
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
