import { Component } from "react";
import { db, auth } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./ProfileComponent.css";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount");
    this.docExists();
  }

  docRef = doc(db, "users", auth.currentUser.displayName);

  async docExists() {
    const docSnap = await getDoc(this.docRef);
    if (docSnap.exists()) {
      this.setState({ description: docSnap.data().description });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async createPost() {
    await setDoc(this.docRef, {
      description: this.state.description
    });
    this.setState({editing: false});
  }

  handleChange(event){
    this.setState({description: event.target.value});
  }

  onEditClicked(){
      this.setState({editing: true});
  }

  onSubmit(){
    this.createPost();
  }

  render() {
    return (
      <div className="profile container">
        <div className="container">
          <h2>{auth.currentUser.displayName}</h2>
        </div>
        <div className="container profile-img">
          <img src={auth.currentUser.photoURL} />
        </div>
        <div className="container profile-data">
          <p>Name: {auth.currentUser.displayName}</p>
          <p>Email: {auth.currentUser.email}</p>
        </div>
        <div className="container description-label">
          <p>Description:</p>
        </div>
        <div className="container profile-description">
          {!this.state.editing ? (
            <p>{this.state.description}</p>
          ) : (
            <textarea
              className="form-control"
              id="commentTextArea"
              rows="2"
              value = {this.state.description}
              onChange={this.handleChange}
            ></textarea>
          )}
        </div>
        <div className="edit-description">
          {!this.state.editing ? (
            <button className="btn btn-warning" onClick={this.onEditClicked}>Edit Description</button>
          ) : (
            <button className="btn btn-success" onClick={this.onSubmit}>Save Description</button>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
