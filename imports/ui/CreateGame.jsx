import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CreateGame extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      options: [{ name: '' , to: ''}],
    };
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }

  handleOptionNameChange = (idx) => (evt) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return { ...option, name: evt.target.value };
    });

    this.setState({ options: newOptions });
  }

  handleOptionToChange = (idx) => (evt) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return { ...option, to: evt.target.value };
    });

    this.setState({ options: newOptions });
  }

  handleSubmit = (evt) => {
    const { name, options } = this.state;
    console.log(options);
    alert(`Incorporated: ${name} with ${options.length} options`);
  }

  handleAddOption = () => {
    this.setState({
      options: this.state.options.concat([{ name: '' }])
    });
  }

  handleRemoveOption = (idx) => () => {
    this.setState({
      options: this.state.options.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Options</h4>

        {this.state.options.map((option, idx) => (
          <div className="option">
            <input
              type="text"
              placeholder={`option #${idx + 1} name`}
              value={option.name}
              onChange={this.handleOptionNameChange(idx)}
            />
            <input
              type="text"
              placeholder={`option #${idx + 1} to`}
              value={option.to}
              onChange={this.handleOptionToChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveOption(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddOption} className="small">Add Option</button>
        <button>Incorporate</button>
      </form>
    )
  }
}

export default CreateGame;