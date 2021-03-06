import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QuizItem from '../quiz/QuizItem'
// import Modal from '../quiz/Modal'
import * as quizActions from './actions'
import {initializeWebSockets} from './socket';
import { Table } from 'react-bootstrap';


class TeacherQuiz extends Component {
  constructor (props){
    super(props);
    this.handleFetch = this.handleFetch.bind(this);
    this.displayQuizList = this.displayQuizList.bind(this);
  }
  componentWillMount (){
    this.handleFetch();
  }

  handleFetch(){
    this.props.actions.fetchQuizList();
  }

  displayQuizList(){
    if (this.props.quizzes){
      return this.props.quizzes.map((quiz,idx)=> {
        return <QuizItem name={quiz} key={idx} /> 
      });  
    }
  }

  render() {
    return (
      <div>
        <Table condensed hover>
        <tbody>
          {this.displayQuizList()}
        </tbody>
        </Table>
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.teacherQuiz,
    quizzes: state.teacherQuiz.quizList,
    status: state.studentQuiz.status
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherQuiz);