import { LOGIN } from './constants';
import { routerMiddleware, push } from 'react-router-redux'
import { returnStore } from '../main';
import { hashHistory } from 'react-router';
import { userLogin } from '../actions/users'
import axios from 'axios';
const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://in-class.herokuapp.com/authentication' : 'http://localhost:8000/authentication' ;

export function signinUser(username, password){

  return function(dispatch, getState){

    axios.post('login', {username: username, password: password})
    .then(response => {

      dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype });
      dispatch(authError(''));

      hashHistory.push('/classroom/' + response.data.usertype);
    })
    .catch((error)=>{
      dispatch(authError(error.data));
    });
  }
}

export function signupUser(username, password,usertype){
  console.log(username,password,usertype);
  return function(dispatch, getState){


    axios.post('signup', { username:username, password:password, usertype: usertype})
    .then(response => {
      console.log(response.data);
      dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype });
      dispatch(authError(''));
      if (response.data.usertype === 'student'){

        hashHistory.push('/classroom/student');
      } else if ( response.data.usertype === 'teacher') {
        hashHistory.push('/classroom/teacher');
      }
    })
    .catch((error)=>{
      dispatch(authError(error.data));
    });
  }
}



export function authError(error){
  return {
    type: 'AUTH_ERROR',
    errorMessage: error,
  }
}

export function signoutUser (username) {
  return (dispatch,getState) => {
    axios.post('logout', {username})
    .then(response => {
      hashHistory.push('/');
      dispatch({ type: 'UNAUTH_USER'});
    })
    .catch((error)=>{
      // dispatch(authError('Trying signing out'));
      // dispatch({ type: 'UNAUTH_USER'});
      console.log('error logging out',error)
    });
  }
}

export function checkAuth() {
  
  return (dispatch, getState) => {
    axios.get(SERVER_URL)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('THIS IS THE DATA:', response.data);
          dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype });
        }
        else {
          dispatch({ type: 'UNAUTH_USER' });
          hashHistory.push('/sign-in')
        }
      })
      .catch((error) => {
        console.log('error checkAuth',error);
        dispatch({ type: 'UNAUTH_USER' });
        hashHistory.push('/sign-in')
      });
  }
}

export function updateLogin(credentials){
  return {
    type: 'UPDATE_LOGIN_FORM',
    credentials: credentials
  }
}

export function toggleUserTypeInSignUp(credentials){
  return {
    type: 'TOGGLE_USERTYPE',
  }
}

