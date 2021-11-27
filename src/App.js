import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PrintPage from './components/PrintPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/invoice/:id" component={PrintPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
