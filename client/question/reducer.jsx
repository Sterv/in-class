//import _ from 'underscore';
var _ = require('underscore')

export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const QUESTION = 'QUESTION';

var dummy_chatMessage = 
{
  username : 'stephen',
  text: 'Hey everyone',
  timestamp: 1461619497989,
}

var initialState = {
  questions: [],
}

export function questions(state = initialState, action){

  switch (action.type) {
    case QUESTION:
      
      var newQuestions = state.questions.concat(action.question)
      
      return {
        questions: newQuestions,
      }
    case UPVOTE: 

      var updatedQuestions = _.map(state.questions.slice(), (question) => {
        if (question.id === action.id){
          question.upvotes.push(action.username);
        }
        return question; 
      });
      return {
        questions: updatedQuestions,
      }
    default: 
      return state;
  }
} 

export default questions;