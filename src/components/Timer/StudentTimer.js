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