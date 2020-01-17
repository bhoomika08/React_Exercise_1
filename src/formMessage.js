import React from 'react';

class FormMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  handleSubmit(event) {
    this.setState({message: ''});
    alert('Message Entered: ' + this.state.message);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Message:
          <div>
            <textarea name="message" value={this.state.value} onChange={this.handleChange}></textarea>
          </div>
        </label> 
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FormMessage;