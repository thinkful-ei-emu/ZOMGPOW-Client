import React from 'react';
import TeacherContext from '../../Contexts/TeacherContext';
import './LearningTargetForm.css';

class LearningTargetForm extends React.Component {

  static contextType = TeacherContext;

  state = {
    error: null,
  }
  staticDefaultProps={}

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.startSession();
    this.props.showModal();
  }
  render() {
    return (
      <div className='learning-target-container'>
      <form className='learning-target-form'
        onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor='learningTarget'>Learning Target:</label>
            <textarea 
              id='learning-target'
              onChange={this.props.handleChange}
              value={this.props.learningTarget}
              name='learningTarget'
              aria-label='learning target'
              aria-required='true'
              required
              />
            <div>
              <button type='submit' className='button green-button'>Start Session</button>
            </div>
          </form>
          </div>
    )
  }
}

export default LearningTargetForm