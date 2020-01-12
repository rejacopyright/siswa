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

const Home = () => (<h1>Home</h1>);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title : 'Siska'
    }
  }
  render() {
    return (
      <h1>OKE</h1>
    );
  }
}
export default App;
