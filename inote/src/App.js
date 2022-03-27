import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'


function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>

        </Switch>
      </Router>
    </NoteState>
  );
}

export default App;
