import { Component } from "react";
import "./PostComponent.css";
import { auth } from "../firebase-config";

class PostComponent extends Component {

    constructor(props){
        super(props);

        this.deleteDoc = this.deleteDoc.bind(this);
    }

    deleteDoc(){
        console.log("Delete " + this.props.id);
        this.props.deleteDoc(this.props.id);
    }

  render() {
    return (
      <div className="post container">
        <div className="post-header">
          <div className="post-title">
            <h4>{this.props.title}</h4>
          </div>
          {this.props.isAuth && this.props.authorId === auth.currentUser.uid && <div className="delete-post">
            <button className="btn btn-light" onClick={this.deleteDoc}>&#128465;</button>
          </div>}
        </div>
        <div>
          <p className="post-body">{this.props.body}</p>
        </div>
        <div className="post-author">
          <p>@{this.props.authorName}</p>
        </div>
        <div>
          <button className="btn btn-info">See comments...</button>
        </div>
      </div>
    );
  }
}

export default PostComponent;
