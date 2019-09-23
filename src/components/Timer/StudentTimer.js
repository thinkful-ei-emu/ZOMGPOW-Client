import React from 'react';
import './StudentTimer.css';

class StudentTimer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timer: false,
      currMin: 0,
      currSec: '00',
    }
  }


  componentDidMount(){
    if(this.props.currTimer){
      this.handleDisplayTimer(this.props.currTimer.end)
    }
  }

  handleDisplayTimer = (endTime) => {
    this.setState({
      timer: true,
      interval: setInterval(this.displayTimer, 1000, endTime)
    })
    
  }

  displayTimer = (endTime) => {
    console.log('display timer ran')
    
    let now = Date.now()

    if(now > endTime){
      clearInterval(this.state.interval)
      this.setState({
        currMin: 0,
        currSec: '00'
      })
      return
    }

    let milliSecs = endTime - now;
    let secs = milliSecs / 1000;
    console.log('seconds', secs)
    let minutes = (secs / 60).toFixed(0)
    let displaySecs = (secs - (minutes * 60)).toFixed(0)
    if(displaySecs < 10){
      displaySecs = `0${displaySecs}`
    }

    this.setState({
      currMin: minutes,
      currSec: displaySecs
    })

  }


  render() {
    
    const {currMin, currSec} = this.state
    
    return (
      <div className='timer'>{currMin}:{currSec}</div>
    )
  }
}

export default StudentTimer;