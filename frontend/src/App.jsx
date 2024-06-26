import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Home from "./Home.jsx";
import Addpost from "./components/AddPost.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import PostList from "./components/PostsManager.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-up" element={<Signup />} />
        <Route exact path="/sign-in" element={<Signin />} />
        <Route
          exact
          path="/add-post"
          element={
            <RequireAuth>
              <Addpost />
            </RequireAuth>
          }
        />
        <Route exact path="/edit-post" element={
          <RequireAuth>
            <PostList />
          </RequireAuth>
          } />{" "}
        {/* Add the
        route for news details */}
      </Routes>
    </Router>
  );
}

export default App;
