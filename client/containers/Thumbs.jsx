import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import Login from '../login/Login'



class Thumbs extends Component {

 render() {
   return (
     <div>
       <span><h1>In class...</h1></span>
       <Login />
    </div>

   );
 };



}


export default Thumbs;