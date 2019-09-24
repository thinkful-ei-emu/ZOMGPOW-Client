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


  render() {
    
    const {currMin, currSec} = this.state
    //I set the state to timer: true when the timer is initialized 
    //so if we want to display something else when there is no timer we could do that - Nick
    // so that would be if(timer){display timer} else {display an alternative}
    
    return (
      <div className='timer'>{currMin}:{currSec}</div>
    )
  }
}

export default StudentTimer;