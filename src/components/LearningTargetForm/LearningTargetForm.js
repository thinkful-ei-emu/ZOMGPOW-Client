import React from 'react';

class LearningTargetForm extends React.Component {

  render() {
    return (
      <form>
            <label htmlFor='learning-target'>Learning Target:</label>
            <input 
              id='learning-target'
              name='learning-target'
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