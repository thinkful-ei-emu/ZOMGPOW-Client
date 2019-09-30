import React from 'react';
import './ExitTicketForm.css';

class ExitTicketForm extends React.Component {

  state = {
    exitTicketQuestion: '',
    multipleChoiceA: '',
    multipleChoiceB: '',
    multipleChoiceC: '',
    multipleChoiceD: '',
    multipleChoiceCorrect: '',
    error: null,
    createPromptVisible: true,
    exitTicketChoiceVisible: false,
    multipleChoiceVisible: false,
    shortAnswerVisible: false,
    exitTicketFormVisible: true,
  }

  updateCorrectOption = (e) => {
    this.setState({
      multipleChoiceCorrect: e.target.value,
    })
  }
  updateMultipleChoiceSubmit = (e) => {
    if (e.target.id === 'option-A') {
      this.setState({
        multipleChoiceA: e.target.value,
      })
    }
    if (e.target.id === 'option-B') {
      this.setState({
        multipleChoiceB: e.target.value,
      })
    }
    if (e.target.id === 'option-C') {
      this.setState({
        multipleChoiceC: e.target.value,
      })
    }
    if (e.target.id === 'option-D') {
      this.setState({
        multipleChoiceD: e.target.value,
      })
    }
  }

  updateQuestion = (e) => {
    this.setState({
      exitTicketQuestion: e.target.value,
    })

  }

  submitExitTicket = (e, type) => {
    e.preventDefault();
    this.setState({ error: null})
    // prepare exit ticket data
    let data = {};
    
      if (type === 'multipleChoice') {
        if (this.state.multipleChoiceCorrect !== '') {
          data = {
            exit_ticket_type: 'multiple choice',
            exit_ticket_question: this.state.exitTicketQuestion,
            exit_ticket_options: [
              this.state.multipleChoiceA, 
              this.state.multipleChoiceB, 
              this.state.multipleChoiceC, 
              this.state.multipleChoiceD
            ],
            exit_ticket_correct_answer: this.state.multipleChoiceCorrect,
          }
        } else {
          this.setState({
            error: 'Choose a correct answer option'
          })
          return;
        }
      }
      if (type === 'shortAnswer') {
        data = {
          exit_ticket_type: 'short answer',
          exit_ticket_question: this.state.exitTicketQuestion,
        }
      }
      
      // GIVE TO LT FORM to post to server in relation to LT ID
      this.props.updateExitTicket(data);
      // reset form and state
      this.setState({
        exitTicketQuestion: '',
        multipleChoiceA: '',
        multipleChoiceB: '',
        multipleChoiceC: '',
        multipleChoiceD: '',
        multipleChoiceCorrect: '',
        error: null,
        exitTicketFormVisible: false,
      })    
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div className='modal-content modal-show modal'>
        <h2>Would you like to create an exit ticket for this learning target?</h2>
        
        <div>
          <button 
            className='button blue-button'
            onClick={() => this.setState({multipleChoiceVisible: true, shortAnswerVisible: false})}
          >Multiple Choice
          </button>
          <button 
            className='button green-button'
            onClick={() => this.setState({multipleChoiceVisible: false, shortAnswerVisible: true})}
          >Short Answer
          </button>
          <button 
            className='button red-button'
            onClick={() => this.setState({multipleChoiceVisible: true, shortAnswerVisible: false})}
          >No thanks, start my session
          </button>
        </div>

        <div className={this.state.multipleChoiceVisible ? '' : 'hidden'}>
          <form 
            className='form multiple-choice'
            onSubmit={(e) => this.submitExitTicket(e, 'multipleChoice')}
            >
            <label htmlFor='exit-ticket-question-mc'>Exit Ticket Question:</label>
            <textarea 
              id='exit-ticket-question-mc' 
              onChange={(e) => this.updateQuestion(e)}
              value={this.state.exitTicketQuestion}
              required
              />
            <label htmlFor='option-A'>Option A:</label>
            <input 
              id='option-A' 
              onChange={(e) => this.updateMultipleChoiceSubmit(e)}
              value={this.state.multipleChoiceA}
              required
            />
            <label htmlFor='option-B'>Option B:</label>
            <input 
              id='option-B'
              onChange={(e) => this.updateMultipleChoiceSubmit(e)}
              value={this.state.multipleChoiceB} 
              required
            />
            <label htmlFor='option-C'>Option C:</label>
            <input 
              id='option-C' 
              onChange={(e) => this.updateMultipleChoiceSubmit(e)}
              value={this.state.multipleChoiceC}
              required
            />
            <label htmlFor='option-D'>Option D:</label>
            <input 
              id='option-D' 
              onChange={(e) => this.updateMultipleChoiceSubmit(e)}
              value={this.state.multipleChoiceD}
              required
            />
            <label htmlFor='exit-ticket-correct-answer'>Correct Option:</label>
            <div>
              <input 
                type='radio' 
                name='radio'
                id='correct-option-A'
                value='A'
                onChange={(e) => this.setState({ multipleChoiceCorrect: 'A' })}
                />
              <label 
                htmlFor='correct-option-A'
              >A</label>

              <input 
                type='radio' 
                name='radio'
                id='option-B'
                value='B'
                onChange={(e) => this.setState({ multipleChoiceCorrect: 'B' })}
              />
              <label 
                htmlFor='option-B'
              >B</label>

              <input 
                type='radio'
                name='radio' 
                id='option-C'
                value='C'
                onChange={(e) => this.setState({ multipleChoiceCorrect: 'C' })}
              />
              <label 
                htmlFor='option-C'
              >C</label>

              <input 
                type='radio' 
                name='radio'
                id='option-D'
                value='D'
                onChange={(e) => this.setState({ multipleChoiceCorrect: 'D' })}
              />
              <label 
                htmlFor='option-D'
              >D</label>
            </div>
              {this.state.error && <p className='alert'>{this.state.error}</p>}
            <button 
              type='submit'
              onClose={e => {this.onClose(e)}}
              className='button purple-button'
            >Save Exit Ticket</button>
          </form>
        </div>
        <div className={this.state.shortAnswerVisible ? '' : 'hidden'}>
          <form 
            className='form short-answer'
            onSubmit={(e) => this.submitExitTicket(e, 'shortAnswer')}
            >
            <label htmlFor='exit-ticket-question'>Exit Ticket Question:</label>
            <textarea 
              id='exit-ticket-question-sa' 
              onChange={(e) => this.updateQuestion(e)}
              value={this.state.exitTicketQuestion}
              required
            />
            <button 
              type='submit'
              onClose={e => {this.onClose(e)}}
              className='button purple-button'
            >Save Exit Ticket</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ExitTicketForm;