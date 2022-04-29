import { Component } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import PostComponent from "./PostComponent";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.deletePosts = this.deletePosts.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
  }

  postsCollectionRef = collection(db, "posts");

  componentDidMount() {
    console.log("Component did mount");
    this.refreshPosts();
  }

  refreshPosts(){
    const getPosts = async () => {
      const data = await getDocs(this.postsCollectionRef);
      //let data2 = (data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      this.setState({
        postList: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      });
      console.log(this.state.postList);
    };

    getPosts();
  }

  deletePosts(id){

    console.log("delete2 " + id);

    const deletePostsAsync = async () => {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      this.refreshPosts();
    }

    deletePostsAsync();
    this.refreshPosts();
  }

  render() {
    return (
      <div className="home-component">
        {this.state.postList.map((post) => {
          return <PostComponent key={post.id} id={post.id} title={post.title} body={post.postBody} authorName={post.author.name} authorId={post.author.id} isAuth={this.props.isAuth} deleteDoc={this.deletePosts}/>;
        })}
      </div>
    );
  }
}

export default HomeComponent;
