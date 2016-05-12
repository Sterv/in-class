import React, { Component } from 'react';



export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }


  appendIt(){

    if(this.props.data.videoSession){
     $('#player').append(this.props.data.videoSession.outerHTML);
    }
  };



  render() {

    const videoSession = this.props.data.videoSession; 

    if (videoSession !== null && videoSession !== undefined){
      this.appendIt(videoSession);
    }


   return (
         <div id="player">

         </div>


  );
 }
}