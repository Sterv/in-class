import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { show } from '../actions/userVideoModal';
import * as thumbActions from '../thumbs/actions';
import * as quizActions from '../quiz/actions';
import QuizModal from '../quiz/QuizModal';
import StudentThumbsModal from '../thumbs/StudentThumbsModal';
import TeacherQuizModal from '../quiz/TeacherQuizModal';

import { bindActionCreators } from 'redux'
require('../stylesheets/styles.scss');

class StudentPanel extends React.Component {

  constructor(props) {
    super(props);
    this.displayModal = this.displayModal.bind(this);
    this.openThumbModal = this.openThumbModal.bind(this);
    this.openQuizModal = this.openQuizModal.bind(this);
  };

  openQuizModal(){
    this.props.quizActions.openStudentQuizModal();
  }

  openThumbModal(){
    this.props.thumbActions.beginThumbCheck();
  }

  displayThumbButton(){
    var thumbCheckReady = this.props.thumbCheck;
    
    if (thumbCheckReady){
      return (
        <Button onClick={this.openThumbModal} className="btn-warning btn-circle btn-xl">
             <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
      );
   
    }
  }

  displayQuizButton(){  
    var quizLive = this.props.quizLive;
    if (quizLive){
      return (
        <Button onClick={this.openQuizModal}  className="btn-warning btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-question-sign" />
        </Button>
      )
    }
  }

  displayModal(){
    // return (<div>
    //     <StudentThumbsModal />
    //     <QuizModal />
    //     <TeacherQuizModal />
    //   </div>
    // );
  }
  render() {
    
    return(
      <div className="TeacherControlPanel">
        {this.displayThumbButton()}
        {this.displayQuizButton()}
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    thumbCheck: state.thumbsReducer.thumbCheck,
    storedQuizzes: state.studentQuiz.storedQuizzes,
    quizLive: state.studentQuiz.quizLive,
  };
};

function mapDispatchToProps(dispatch){
  return {
    thumbActions: bindActionCreators(thumbActions,dispatch),
    quizActions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentPanel);