import { LOGIN } from './constants';
import { routerMiddleware, push } from 'react-router-redux'
import { returnStore } from '../main';
import { hashHistory } from 'react-router';
import axios from 'axios';
const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://in-class.herokuapp.com/authentication' : 'http://localhost:8000/authentication' ; 

export function signinUser(username, password){
  
  return function(dispatch, getState){
    
    axios.post('login', {username: username, password: password})
    .then(response => {
      dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype });
      dispatch(authError(''));
      if (response.data.type === 'student'){
        hashHistory.push('/class/student');
      } else {
        hashHistory.push('/class/teacher');
      }
        hashHistory.push('/quiz');
    })
    .catch((error)=>{
      dispatch(authError(error.data));
    });
  }
}

export function signupUser(username, password,usertype){
  
  return function(dispatch, getState){
    
    axios.post('signup', { username, password, usertype})
    .then(response => {
      dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype });
      dispatch(authError(''));
      if (response.data.usertype === 'student'){
        hashHistory.push('/class/student');
      } else if ( response.data.usertype === 'teacher') {
        hashHistory.push('/class/teacher');
      }
      hashHistory.push('/quiz');
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
    axios.post('signout', {username})
    .then(response => {
      hashHistory.push('/');
      dispatch({ type: 'UNAUTH_USER'});
    })
    .catch((error)=>{
      // dispatch(authError('Trying signing out'));
      dispatch({ type: 'UNAUTH_USER'});
    });
  }
}

export function checkAuth(path) {

  return (dispatch, getState) => {
    axios.get(SERVER_URL)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'AUTH_USER', username: response.data.username, usertype: response.data.usertype })
        }
        else {
          dispatch({ type: 'UNAUTH_USER' });
          hashHistory.push('/sign-in')
        }
      })
      .catch((error) => {
        dispatch({ type: 'UNAUTH_USER' });
        hashHistory.push('/sign-in')
      });
  }
}
