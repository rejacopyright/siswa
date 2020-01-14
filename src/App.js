import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ASSETS
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/js/init';
import './assets/fonts/line-awesome/line-awesome.css';
import './assets/css/app.scss';
import './assets/css/custom.scss';
// BASE
import Sidebar from './menu/side';
import Header from './menu/header';
import Page404 from './menu/404';
// PROFILE
import Profile from './profile/profile';
import Materi from './materi/materi';

const Home = () => (<span>Ww</span>);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title : 'Siska'
    }
  }
  render() {
    return (
      <Router>
        <Sidebar onLogout={() => this.props.onLogout()} />
        <div className="page has-sidebar-left vh-100">
          <Header onLogout={() => this.props.onLogout()} />
          <div className="container-fluid my-3">
            <Switch>
              <Route exact path="/"> <Home /> </Route>
              <Route path="/profile" component={Profile} />
              <Route path="/materi" component={Materi} />
              <Route exact path="*" component={Page404} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
