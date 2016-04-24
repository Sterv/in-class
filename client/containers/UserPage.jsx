import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUser, loadStarred } from '../actions';
import User from '../components/User';

function loadData(props) {
 const { login } = this.props;
 props.loadUser(login, [ 'name' ]);
 props.loadStarred(login);
};


class UserPage extends Component {
  constructor(props) {
    super(props);

  };

  componentWillMount() {
    loadData(this.props);
  };

  componentWillRecieveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    };
  };

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading {login}’s profile...</i></h1>
    }

    return (
      <div>
        <User user={user} />
        <hr />
      </div>
    );
  };
};

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { login } = ownProps.params;
  const {
    entities: { users }
  } = state;


  return {
    login,
    user: users[login]
  };
};

export default connect({
  loadUser
 })(UserPage);
