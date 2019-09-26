import React from 'react';
import './SelfEvaluate.css';
// import config from '../../config'
// import TokenService from '../../Services/token-service'
import StudentAuthApiService from '../../Services/student-auth-api-service';

class SelfEvaluate extends React.Component {
  state = {
    score: null,
    error: null,
  }

  setScore=(e) => {
    this.setState({
      score: e.target.value,
    })
  }

  postEvaluation = (e) => {
    e.preventDefault()
    const studentScore = this.state.score;
    const student_goal_id = this.props.location.state.learningTarget.sg_id;
    if(this.props.location.state.currentGoal === undefined){
      StudentAuthApiService.patchStudentGoal(student_goal_id, {evaluation: studentScore})
      .then(() => this.props.history.goBack())
      .catch(error => {
        console.error(error);
        this.setState({ error })
      });
    }
    else{
    const subgoal_id = this.props.location.state.currentGoal.goal_id;
      StudentAuthApiService.patchEvalSubGoal(subgoal_id, {evaluation: studentScore})
      .then(() => this.props.history.goBack())
      .catch(error => {
        console.error(error);
        this.setState({ error })
      });
    }
  }
  
  render(){
    return (
      <div className='self-evaluate-form'>
      <h3>How do you feel you met your current goal?</h3>
      {(this.props.location.state.currentGoal === undefined) ?
      this.props.location.state.learningTarget.goal_title 
      : this.props.location.state.currentGoal.goal_title}
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