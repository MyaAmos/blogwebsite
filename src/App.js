import "./App.css";
import { Component } from "react";
import BlogApp from "./components/BlogApp";
import withNavigation from "./components/WithNavigation";

class App extends Component {

  render() {
    const BlogAppWithNav = withNavigation(BlogApp);

    return (
      <div className="App">
        <BlogApp />
      </div>
    );
  }
}


export default App;
