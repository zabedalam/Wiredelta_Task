import './App.css';
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Proposals from './components/Proposals/Proposals';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/sign-up">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/proposals">
            <Proposals />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;

