import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import TeacherQuiz from './TeacherQuiz';
import * as quizActions from './actions';
import {hashHistory} from 'react-router';
import {initializeWebSockets, closeWebSockets} from './socket';


class TeacherQuizModal extends React.Component {

  constructor(props){
    super(props);
    this.hideModal = this.hideModal.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);
  }
  
  componentWillMount (){
    this.initializeWebSockets();
  }
  hideModal (){
    this.props.quizActions.closeTeacherQuizModal();
  }

  createQuiz(){
    hashHistory.push('/create-quiz');
  }

  render() {
    var displayModal = this.props.displayModal;
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title>Your Quizzes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TeacherQuiz />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.createQuiz} bsStyle="info" bsSize="small" >add quiz</Button>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    displayModal: state.teacherQuiz.displayModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    quizActions: bindActionCreators(quizActions,dispatch)
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherQuizModal);
