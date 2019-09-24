import React from 'react';
import './SelfEvaluate.css';

class SelfEvaluate extends React.Component {
  state = {
    score: null,
  }

  setScore=(e) => {
    this.setState({
      score: e.target.value,
    })
  }

  postEvaluation = (e) => {
    e.preventDefault()
    const studentScores = this.state.score;
    console.log(studentScores);
    //post to database??
    this.props.history.goBack();
  }

  render(){
    return (
      <div className='self-evaluate-form'>
      <h3>How do you feel you met your current goal?</h3>
      <form className='form' onSubmit={this.postEvaluation}>
        <input
          onChange={(e) => this.setState({ score: 1 })}
          className='radio'
          type='radio'
          value='low'
          id='low'
          name='priority'
          required/>
        <label
          htmlFor='low'>Thumbs down</label>
        <input
         onChange={(e) => this.setState({ score: 2 })}
          className='radio'
          type='radio'
          value='medium'
          id='medium'
          name='priority'/>
        <label
          htmlFor='medium'>Thumb sideways</label>
        <input
         onChange={(e) => this.setState({ score: 3 })}
          className='radio'
          type='radio'
          value='high'
          id='high'
          name='priority'/>
        <label
          htmlFor='high'>Thumbs up</label>
        <button className='button purple-button'>Submit Evaluation</button>
      </form>
      </div>
    )
  }
}

export default SelfEvaluate;