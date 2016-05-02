import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import QuestionBox from './QuestionBox'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'

class QuestionContainer extends Component {


 render() {
   return (
     <div>
<<<<<<< HEAD
      <span><h1>In class...</h1></span>
      <Login />
=======
>>>>>>> addQuestions
      <QuestionBox />
    </div>
   );
 };
}


export default QuestionContainer;