import "./App.css";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Widgets from "./Widgets";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div className="app__container">
            <Switch>
              <Route path="/what">
                <h2>WHAT PAGE?</h2>
              </Route>

              <Route path="/">
                <Sidebar />
                <Feed />
                {/* <Widgets /> */}
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
