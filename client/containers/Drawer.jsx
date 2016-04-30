import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DrawerActions from '../actions/drawer';
import Quiz from '../components/Quiz';
require('../stylesheets/drawer.scss');

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
    const PANEL_THUMB = 'PANEL_THUMB';

    let id = 0;

    return (
      <div>
        <div className="drawer">
          <div id="controls" className={visibility ? " visible" : ""}>
            <ul>
              <li className="first" onClick={() => actions.display(PANEL_QUIZ) }> Quiz </li>
              <li className="last" onClick={() => actions.display(PANEL_THUMB) }> Chat </li>
            </ul>
          </div>

          <div id="panels" className={visibility ? " visible" : ""}>
            <div style={{display: panel === PANEL_QUIZ ? '' : 'none'}}><Quiz/></div>
            <div style={{display: panel === PANEL_THUMB ? '' : 'none'}}>Thumbs</div>
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
