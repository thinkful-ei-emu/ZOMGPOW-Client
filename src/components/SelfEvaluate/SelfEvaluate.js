import React from 'react';
import './SelfEvaluate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    const student_goal_id = this.props.location.state.learningTarget;
      StudentAuthApiService.patchStudentGoal(student_goal_id, {evaluation: studentScore})
      .then(() => this.props.history.goBack())
      .catch(error => {
        console.error(error);
        this.setState({ error })
      });
  }
  
  render(){
    return (
      <div className='self-evaluate-form'>
      <form className='form' onSubmit={this.postEvaluation}>
      <h3>Rate your level of understanding:</h3>
      <div className='option'>
        <input
         onChange={(e) => this.setState({ score: 3 })}
          className='radio'
          type='radio'
          value='high'
          id='high'
          name='priority'/>
        <label
          htmlFor='high'>
          <FontAwesomeIcon className='high' size="2x" icon={['far', 'smile']} />
          </label>
      </div>
      <div className='option'>
        <input
         onChange={(e) => this.setState({ score: 2 })}
          className='radio'
          type='radio'
          value='medium'
          id='medium'
          name='priority'/>
        <label
          htmlFor='medium'>
          <FontAwesomeIcon className='medium' size="2x" icon={['far', 'meh']} />
        </label>
      </div>
      <div className='option'>
        <input
          onChange={(e) => this.setState({ score: 1 })}
          className='radio'
          type='radio'
          value='low'
          id='low'
          name='priority'
          required/>
        <label
          htmlFor='low'>
          <FontAwesomeIcon className='low' size="2x" icon={['far', 'angry']} />
          </label>
      </div>
      <button className='button purple-button'>Submit Evaluation</button>
      </form>
      
      </div>
    )
  }
}

export default SelfEvaluate;