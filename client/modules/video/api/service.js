const VIDEO_TIMEOUT = 2000;

function appendVideo(session) {
  document.getElementById("player").appendChild(session.video);
  this.props.videoActions.setControllerVisibility(true);
};

function removeVideo() {
  $('#player video').remove();
  this.props.videoActions.setControllerVisibility(false);
};

function toggleMute() {
  let mute = this.props.mute;
  this.props.videoActions.setMute(!mute);
}

export function login(username) {

  let appendVideo = this.appendVideo.bind(this);
  let removeVideo = this.removeVideo.bind(this);
  let setMute = this.props.videoActions.setMute;

  var phone = window.phone = PHONE({
      number        : username || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
      subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
      ssl : (('https:' == document.location.protocol) ? true : false)
  });

  var ctrl = window.ctrl = CONTROLLER(phone);

  ctrl.ready(function(){ });

  // receives phone conversation back from PubNub
  ctrl.receive(function(session){
    session.connected(function(session) {
      appendVideo(session);
    });

    session.ended(function(session) {
      removeVideo(session);
    });
  });

  ctrl.audioToggled(function(session, isEnabled){
    ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.50);
  });
};

export function hangupThenCall(user) {
  makeCall(user);
}

export function makeCall(user) {
  if (!window.phone) {
    alert("Login First!");
    return;
  }

  window.ctrl.dial(user);
};

export function end() {
  window.ctrl.hangup();

  // TODO if current state is mute / toggle them before close;
  this.props.videoActions.setMute(false);
};

export function mute() {
  window.ctrl.toggleAudio();
  toggleMute.bind(this)();
};
