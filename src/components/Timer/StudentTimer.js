import React from 'react';
import './StudentTimer.css';
import config from '../../config';
import StudentAuthApiService from '../../Services/student-auth-api-service';
import openSocket from 'socket.io-client';

class StudentTimer extends React.Component {

  socket = openSocket('http://localhost:8000')

  constructor(props){
    super(props)
    this.state = {
      timer: false,
      currMin: 0,
      currSec: '00',
    }
  }

  componentDidMount(){

    if(this.props.subgoalTitle){
      fetch(`${config.API_ENDPOINT}/subgoals/subgoal/timer/${this.props.subgoalTitle}`)
      .then(res => res.json())
      .then(res => {
        let endTime = res.endTime.end_time;
        let formattedEndTime = parseInt(endTime)
        this.handleDisplayTimer(formattedEndTime);
      })
    }
    this.socket.on('patch timer', this.rTPatchStudentGoal)
  }

  rTPatchStudentGoal = async (data) => {
    const  { subgoalTitle } = this.props;
    if(subgoalTitle === data.subgoal_title){
      let newEndTime = parseInt(data.end_time)
      this.handleDisplayTimer(newEndTime);
    }
  }

  handleDisplayTimer = (endTime) => {
    this.setState({
      timer: true,
    })
    this.interval = setInterval(this.displayTimer, 1000, endTime)
  }

  displayTimer = (endTime) => {
    let now = Date.now()
    if(now > endTime){
      clearInterval(this.interval)
      this.setState({
        currMin: 0,
        currSec: '00'
      })
      return
    }

    let milliSecs = endTime - now;
    let minutes = Math.floor(((milliSecs / 1000) / 60))
    let secs = Math.floor(((milliSecs / 1000) % 60))

    if(secs < 10){
      secs = `0${secs}`
    } 
    this.setState({
      currMin: minutes,
      currSec: secs
    })
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {    
    const {currMin, currSec, timer} = this.state
    

    if (!timer){
      //Don't know what to use as a placeholder when no timer?? -- Nick
      return <div className='timer'></div>
    }
    return (
      <div className='timer'>{currMin}:{currSec}</div>
    )
  }
}

export default StudentTimer;