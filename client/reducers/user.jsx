

function userReducer(state = {username: 'sterv'}, action){
  switch (action.type){
    case 'LOGIN':
      return { username: action.username };
  }
  return state;
};

export default userReducer;