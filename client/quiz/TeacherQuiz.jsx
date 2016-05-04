import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QuizItem from '../quiz/QuizItem'
// import Modal from '../quiz/Modal'
import * as quizActions from './actions'
import {initializeWebSockets} from './socket';

class TeacherQuiz extends Component {
  constructor (props){
    super(props);
    this.initializeWebSockets = initializeWebSockets.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount (){
    this.initializeWebSockets();
  }

  handleClick (e){
    var {storedQuizzes, status, actions} = this.props;
    console.log(e)
  }

  handleFetch(){
    this.props.actions.getQuizzes();
  }

  render() {
    var {quizzes, status} = this.props;
    var self = this;
    var quizArray = quizzes.map((quiz,idx)=> {
      return <QuizItem name={quiz} key={idx} /> 
    });
    
    var editing;
    //if (this.props.quiz.editingQuiz){
      console.log(this.props.quiz.quizToEdit);
    //}
    var editingQuiz = this.props.quiz.quizToEdit.map((quiz)=>{
      return <div>{quiz.question}></div>
    })

    return (
      <div>
        <button onClick={this.handleFetch}>Download Quizzes</button>  
        {quizArray}
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.quiz,
    quizzes: state.quiz.quizzes,
    status: state.studentQuiz.status
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherQuiz);