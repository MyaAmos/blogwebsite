import { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./CreatePostComponent.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

class CreatePostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postBody: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  onSubmit(values) {
    this.createPost(values.postTitle, values.postBody);
  }

  validate(values) {
    let errors = {};

    if (!values.postTitle) {
      errors.postTitle = "Enter a post title";
    }

    if (!values.postBody) {
      errors.postBody = "Enter a body for your post";
    } else if (values.postBody.length < 10) {
      errors.postBody = "Body of post must be at least 5 characters";
    }

    return errors;
  }

  postsCollectionRef = collection(db, "posts");
  async createPost(postTitle, postBody) {
    await addDoc(this.postsCollectionRef, {
      title: postTitle,
      postBody: postBody,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      comments: []
    });
    this.props.navigate("/");
  }

  render() {
    let { postTitle, postBody } = this.state;

    return (
      <div className="create-post-component">
        <div className="container post-form">
          <h1>Create A Post</h1>
          <div className="container">
            <Formik
              initialValues={{ postTitle, postBody }}
              onSubmit={this.onSubmit}
              validateOnChange={false}
              validateOnBlur={false}
              validate={this.validate}
              enableReinitialize={true}
            >
              {(props) => (
                <Form>
                  <ErrorMessage
                    name="postTitle"
                    component="div"
                    className="alert alert-warning"
                  />
                  <ErrorMessage
                    name="postBody"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="form-group title-form-group">
                    <label className="title-label">Title: </label>
                    <Field
                      className="form-control"
                      type="text"
                      name="postTitle"
                      placeholder="Title..."
                    ></Field>
                  </fieldset>
                  <fieldset className="form-group post-form-group">
                    <label className="post-label">Post: </label>
                    <Field
                      className="form-control text-area-input"
                      as="textarea"
                      name="postBody"
                      placeholder="Post..."
                    ></Field>
                  </fieldset>
                  <button className="btn btn-success post-btn" type="submit">
                    Post
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePostComponent;
