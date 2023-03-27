import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Switch,Route} from "react-router-dom"
import { useState } from 'react';
import createClass from 'create-react-class';



function App() {

  const [mode,setmode]=useState("light");
  const [cel,setCel]=useState("");
  var CommentsWrapper = createClass({
    render: function(){
      return(<Home myprop={cel} mode={mode}/>)
    }
  })
  return (
   <>
    <Navbaar parentCallback={setCel}/>
    <script>{console.log(cel)}</script>
    <Switch>
      <Route exact path="/" component={CommentsWrapper} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/view/:id" component={Details} />
    </Switch>
   
   </>
  );
}

export default App;






