import React from 'react';
import './SelfEvaluate.css';
import StudentAuthApiService from '../../Services/student-auth-api-service';

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
    const studentScore = this.state.score;
    const classId = this.props.location.state.learningTarget.class_id;
    const studentId = this.props.location.state.learningTarget.student_id;
    const goalId = this.props.location.state.learningTarget.id;
    if(this.props.location.state.currentGoal === undefined){
      StudentAuthApiService.patchEvalGoal(classId, studentId, goalId, studentScore)
      .then(res => console.log(res))
      // .then(() => this.props.history.goBack())
    }
    else{
    const subGoalId = this.props.location.state.currentGoal.goal_id;
      StudentAuthApiService.patchEvalSubGoal(subGoalId, studentScore)
      .then(res => console.log(res))
      // .then(() => this.props.history.goBack())
    }
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