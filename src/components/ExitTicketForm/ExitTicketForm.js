import React from 'react';
import './ExitTicketForm.css';

class ExitTicketForm extends React.Component {

  state = {
    error: null,
    multipleChoiceVisible: false,
    shortAnswerVisible: false,
  }

  multipleChoice = () => {
    this.setState({multipleChoiceVisible: true, shortAnswerVisible: false})
  }

  shortAnswer = () => {
    this.setState({multipleChoiceVisible: false, shortAnswerVisible: true})
  }

  onClose = () => {
    this.setState({multipleChoiceVisible: false, shortAnswerVisible: false});
    this.props.onClose();
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div className='modal-container'>
      <div className='modal'>
        <div className='close' onClick={this.onClose}>X</div>
        <h2>Would you like to create an exit ticket for this learning target?</h2>
        <div className={this.state.multipleChoiceVisible ? '' : 'hidden'}>
          <form 
            className='form multiple-choice'
            onSubmit={(e) => this.props.submitExitTicket(e, 'multipleChoice')}
            >
            <label htmlFor='exit-ticket-question-mc'>Exit Ticket Question:</label>
            <textarea 
              id='exit-ticket-question-mc' 
              onChange={(e) => this.props.updateQuestion(e)}
              value={this.props.exitTicketQuestion}
              required
              />
            <label htmlFor='option-A'>Option A:</label>
            <input 
              id='option-A' 
              onChange={(e) => this.props.updateMultipleChoiceSubmit(e)}
              value={this.props.multipleChoiceA}
              required
            />
            <label htmlFor='option-B'>Option B:</label>
            <input 
              id='option-B'
              onChange={(e) => this.props.updateMultipleChoiceSubmit(e)}
              value={this.props.multipleChoiceB} 
              required
            />
            <label htmlFor='option-C'>Option C:</label>
            <input 
              id='option-C' 
              onChange={(e) => this.props.updateMultipleChoiceSubmit(e)}
              value={this.props.multipleChoiceC}
              required
            />
            <label htmlFor='option-D'>Option D:</label>
            <input 
              id='option-D' 
              onChange={(e) => this.props.updateMultipleChoiceSubmit(e)}
              value={this.props.multipleChoiceD}
              required
            />
            <label htmlFor='exit-ticket-correct-answer'>Correct Option:</label>
            <div>
              <input 
                type='radio' 
                name='radio'
                id='correct-option-A'
                value='A'
                onChange={(e) => this.props.updateCorrectAnswer(e, 'A')}
                />
              <label 
                htmlFor='correct-option-A'
              >A</label>

              <input 
                type='radio' 
                name='radio'
                id='option-B'
                value='B'
                onChange={(e) => this.props.updateCorrectAnswer(e, 'B')}              />
              <label 
                htmlFor='option-B'
              >B</label>

              <input 
                type='radio'
                name='radio' 
                id='option-C'
                value='C'
                onChange={(e) => this.props.updateCorrectAnswer(e, 'C')}              />
              <label 
                htmlFor='option-C'
              >C</label>

              <input 
                type='radio' 
                name='radio'
                id='option-D'
                value='D'
                onChange={(e) => this.props.updateCorrectAnswer(e, 'D')}              />
              <label 
                htmlFor='option-D'
              >D</label>
            </div>
              {this.state.error && <p className='alert'>{this.state.error}</p>}
            <button 
              type='submit'
              className='button green-button'
            >Start Session</button>
          </form>
        </div>
        <div className={this.state.shortAnswerVisible ? '' : 'hidden'}>
          <form 
            className='form short-answer'
            onSubmit={(e) => this.props.submitExitTicket(e, 'shortAnswer')}
            >
            <label htmlFor='exit-ticket-question'>Exit Ticket Question:</label>
            <textarea 
              id='exit-ticket-question-sa' 
              onChange={(e) => this.props.updateQuestion(e)}
              value={this.props.exitTicketQuestion}
              required
            />
            <button 
              type='submit'
              className='button green-button'
            >Start Session</button>
          </form>
          </div>
        <div className='exit-ticket-button-container'>
          <button 
            className='button blue-button'
            onClick={() => this.setState({multipleChoiceVisible: true, shortAnswerVisible: false})}
          >Multiple Choice
          </button>
          <button 
            className='button purple-button'
            onClick={() => this.setState({multipleChoiceVisible: false, shortAnswerVisible: true})}
          >Short Answer
          </button>
          <button 
            className='button green-button'
            onClick={(e) => this.props.handleSubmit(e)}
          >No thanks, start my session
          </button>
        </div>
      </div>

        
        
      </div>
    )
  }
}

export default ExitTicketForm;