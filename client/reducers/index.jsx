import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import quiz from './quiz';
import Users from './user';
import questions from '../question/reducer';
import user from '../login/reducer';
import userVideoModal from './userVideoModal';
import video from '../modules/video/reducers/reducer_sessions';
  

const rootReducer = combineReducers({
 routing,
 quiz,
 Users,
 questions,
 drawer,
 user,
 video,
 userVideoModal
});

export default rootReducer;
