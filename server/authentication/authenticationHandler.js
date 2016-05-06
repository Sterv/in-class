const db = require(__dirname + '/../database/database.js')();
const dbTest = require(__dirname + '/../database/database.js')('test');
const jwt = require('jsonwebtoken');
const hash = require('./hash.js');
const secret = 'when in class... do as the students do';

function handleLogin(req, res) {
  var username = req.body.username;
  var password =  req.body.password;
  var test = req.query.test;
  var database = test ? dbTest : db;
  
  var userType;
  
  if (typeof username !== 'string' || typeof username !== 'string') {
    res.status(400).send('bad request');
    return void 0;
  }

  database.fetch('users', 'password, userType', 'username=\'' + username + '\'')
  .then(function (user) {
    // console.log(user);
    if (user.length === 1) {
      user = user[0];
      userType = user.userType;
      return hash.checkHash(password, user.password);
    }
    return Promise.reject('username and password do not match');
  })
  .then(function (bool) {
    if (bool) {
      return Promise.resolve();
    }
    return Promise.reject('username and password do not match');
  })
  .then(function () {
    var token = jwt.sign({username: username, userType: userType}, secret);
    res.cookie('authorization', 'Bearer ' + token).status(200).send({cookie: 'authorization=Bearer ' + token, username: username, userType: userType});
 
    console.log('userType: ', userType);
    
  })
  .catch(function (error){
    console.error(error);
    res.status(400).send(error);
  });
}

function handleSignup(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var userType = req.body.userType;
  var test = req.query.test;
  var database = test ? dbTest : db;

  

  if (typeof username !== 'string' || typeof username !== 'string') {
    res.status(400).send('bad request');
    return void 0;
  }


  // check if username is taken then create new user if the name is unique
  database.fetch('users', '*', 'username = "' + username + '"')
  .catch((error) => [])
  .then(function (existingUser) {
    if (existingUser.length > 0) {
      return Promise.reject('username already exists');
    } else {
      return hash.makeHash(password);
    }
  })
  .then(function (hashed) {
    return database.insertInto('users', {username: username, password: hashed, userType: userType, created: Date.now()}, true);
  })
  .then(function () {
    var token = jwt.sign({username: username, userType: userType}, secret);
    res.cookie('authorization', 'Bearer ' + token).status(200).send({cookie: 'authorization=Bearer ' + token, username: username, userType: userType});

    console.log('userType: ', userType);

    return Promise.resolve();
  })
  .catch(function (error){
    console.error(error);
    res.status(400).send(error);
  });
}

function handleLogout (request, response) {
  response.cookie('authorization', '').status(200).send('logout successful')
}



module.exports =  {
                    login: handleLogin,
                    signup: handleSignup,
                    logout: handleLogout
                  };

