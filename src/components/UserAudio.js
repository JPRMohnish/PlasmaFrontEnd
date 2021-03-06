import React, { Component } from "react";
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
export class UserAudio extends Component {

  state = { 
    isRecording: false,
    blobURL: '',
    isBlocked: false,
    audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      }
   }
    handleAudioStop(data){
        console.log(data)
        this.setState({ audioDetails: data });
    }
    handleAudioUpload(file) {
        console.log(file);
    }
    handleRest() {
        const reset = {
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
        }
        };
        this.setState({ audioDetails: reset });
  }
 componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          this.setState({ isBlocked: false });
        },
        () => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        },
      );
 }
  render() {
    return (
      <div className="card card-user">
         <Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={data => this.handleAudioStop(data)}
            handleAudioUpload={data => this.handleAudioUpload(data)}
            handleRest={() => this.handleRest()} 
        />
      </div>
    );
  }
}
export default UserAudio;
