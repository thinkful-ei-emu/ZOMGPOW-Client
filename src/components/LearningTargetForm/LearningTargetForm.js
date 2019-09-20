import React from 'react';
import './LearningTargetForm.css';
import config from '../../config';
import TokenService from '../../Services/token-service';
import TeacherContext from '../../Contexts/TeacherContext';

class LearningTargetForm extends React.Component {
  static contextType = TeacherContext;
  state = {
    error: null,
    learningTarget: '',
  }

  // Updates state with every user input change
  handleChange = (e) => {
    this.setState({
      learningTarget: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { learningTarget } = e.target;
    const classLearningTarget = {
      goal_title: learningTarget.value,
    }
    const class_id = this.context.teacherClass.teacherClass.id;
    fetch(`${config.API_ENDPOINT}/goals/class/${class_id}`, {
      method: 'POST',
      body: JSON.stringify(classLearningTarget),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      if(!res){
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
    this.setState({
      learningTarget: ''
    })
  }

  render() {
    return (
      <form className='learning-target-form'
        onSubmit={this.handleSubmit}>
            <label htmlFor='learningTarget'>Learning Target:</label>
            <textarea 
              id='learning-target'
              onChange={this.handleChange}
              value={this.state.learningTarget}
              name='learningTarget'
              aria-label='learning target'
              aria-required='true'
              required
              />
            <div>
              <button type='submit'>Start Session</button>
            </div>
          </form>
    )
  }
}

export default LearningTargetForm