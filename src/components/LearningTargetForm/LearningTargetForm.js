import React from 'react';
import './LearningTargetForm.css';

class LearningTargetForm extends React.Component {

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
    // Post learning target to API -- WHAT ENDPOINT?
    const { learningTarget } = e.target
    console.log(learningTarget.value);
    this.setState({
      learningTarget: ''
    })
    // this.props.history.push('/session')
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