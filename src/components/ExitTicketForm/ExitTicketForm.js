import React from 'react';
import './ExitTicketForm.css';

class ExitTicketForm extends React.Component {

  state = {
    exitTicketQuestion: null,
    multipleChoiceOptions: {},
    multipleChoiceCorrectAnswers:[]
  }

  render() {

    return (
      <div className='exit-ticket-form'>
        <button className='button purple-button'>Create an Exit Ticket for this Learning Target?</button>
        
        <div className=''>
          <button className='button blue-button'>Multiple Choice</button>
          <button className='button green-button'>Short Answer</button>
        </div>

        <div className=''>
      <form className='form multiple-choice'>
        <label htmlFor='exit-ticket-question'>Exit Ticket Question:</label>
        <input id='exit-ticket-question' />
        <label htmlFor='option-A'>Option A:</label>
        <input id='option-A' />
        <label htmlFor='option-B'>Option B:</label>
        <input id='option-B' />
        <label htmlFor='option-C'>Option C:</label>
        <input id='option-C' />
        <label htmlFor='option-D'>Option D:</label>
        <input id='option-D' />
        <label htmlFor='exit-ticket-correct-answer'>Correct Answer:</label>
        <input id='exit-ticket-correct-answer' />
        <button className='button purple-button'>Start Session</button>
      </form>

      <form className='form short-answer'>
        <label htmlFor='exit-ticket-question'>Exit Ticket Question:</label>
        <input />
        <button className='button purple-button'>Start Session</button>
      </form>
      </div>
      </div>
    )
  }
}

export default ExitTicketForm;