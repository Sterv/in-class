import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DrawerActions from '../actions/drawer';
import Quiz from '../components/Quiz';
require('../stylesheets/drawer.scss');
import QuestionContainer from '../question/container';
<<<<<<< HEAD
=======
import ChatContainer from '../chat/container';
>>>>>>> addQuestions

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
  }

  hide() {
    this.props.actions.hide();
  }

  render() {
    const { actions, visibility, panel } = this.props;

    const PANEL_QUIZ = 'PANEL_QUIZ';
    const PANEL_CHAT = 'PANEL_CHAT';
    const PANEL_THUMB = 'PANEL_THUMB';
    const PANEL_QUESTIONS = 'PANEL_QUESTIONS';

    let id = 0;

    return (
      <div>
        <div className="drawer">
          <div id="controls" className={visibility ? " visible" : ""}>
            <ul>
<<<<<<< HEAD
              <li className="first" onClick={() => actions.display(PANEL_QUIZ) }> Quiz </li>
=======
              <li className="first" onClick={() => actions.display(PANEL_CHAT) }> Chat </li>
>>>>>>> addQuestions
              <li className="last" onClick={() => actions.display(PANEL_QUESTIONS) }> Questions </li>
            </ul>
          </div>

          <div id="panels" className={visibility ? " visible" : ""}>
<<<<<<< HEAD
            <div style={{display: panel === PANEL_QUIZ ? '' : 'none'}}><Quiz/></div>
=======
            <div style={{display: panel === PANEL_CHAT ? '' : 'none'}}><ChatContainer/></div>
>>>>>>> addQuestions
            <div style={{display: panel === PANEL_QUESTIONS ? '' : 'none'}}><QuestionContainer/></div>
          </div>
        </div>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    visibility: state.drawer.visibility,
    panel: state.drawer.panel
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DrawerActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
