import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CreateGame extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      scenes: [{
        text: '',
        options: [{ name: '' , to: ''}],
      }],
    };
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }

  handleSceneTextChange = (idx) => (evt) => {
    const newScenes = this.state.scenes.map((scene, sidx) => {
      if (idx !== sidx) return scene;
      return { ...scene, text: evt.target.value };
    });

    this.setState({ scenes: newScenes });
  }

  handleOptionToChange = (idx, idxo) => (evt) => {
    const newScenes = this.state.scenes.map((scene, sidx) => {
      if (idx !== sidx) return scene;
      else {
        const newOptions = scene.options.map((option, oidx) => {
          if (idxo !== oidx) return option;
          else return { ...option, to: evt.target.value };
        })
        scene.options = newOptions;
        return scene;
      }
    });

    this.setState({ scenes: newScenes });
  }

  handleOptionNameChange = (idx, idxo) => (evt) => {
    const newScenes = this.state.scenes.map((scene, sidx) => {
      if (idx !== sidx) return scene;
      else {
        const newOptions = scene.options.map((option, oidx) => {
          if (idxo !== oidx) return option;
          else return { ...option, name: evt.target.value };
        })
        scene.options = newOptions;
        return scene;
      }
    });

    this.setState({ scenes: newScenes });
  }

  handleSubmit = (evt) => {
    const { name, options } = this.state;
    console.log(options);
    alert(`Incorporated: ${name} with ${options.length} options`);
  }

  handleAddScene = () => {
    this.setState({
      scenes: this.state.scenes.concat([{
        text: '',
        options: [{ name: '' , to: ''}],
      }])
    });
  }

  handleRemoveScene = (idx) => () => {
    this.setState({
      scenes: this.state.scenes.filter((s, sidx) => idx !== sidx)
    });
  }

  handleAddOption = (idx) => () => {
    const newScenes = this.state.scenes.map((scene, sidx) => {
      if (idx !== sidx) return scene;
      else {
        const newOptions = scene.options.concat([{ name: '' , to: ''}])
        scene.options = newOptions;
        return scene;
      }
    });

    this.setState({
      scenes: newScenes
    });
  }

  handleRemoveOption = (idx, idxo) => () => {
    const newScenes = this.state.scenes.map((scene, sidx) => {
      if (idx !== sidx) return scene;
      else {
        const newOptions = this.state.options.filter((s, sidx) => idxo !== sidx)
        scene.options = newOptions;
        return scene;
      }
    });

    this.setState({
      scenes: newScenes
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>CREATING GAME:</h3>

        {this.state.scenes.map((scene, idx) => (
          <div className="scene">
            <h4>Scene ${idx + 1}</h4>
            <textarea
              placeholder={`scene ${idx + 1} text`}
              value={scene.text}
              onChange={this.handleSceneTextChange(idx)}
            ></textarea><br/>
            <button type="button" onClick={this.handleRemoveScene(idx)} className="small">Delete Scene</button>
            <button type="button" onClick={this.handleAddOption(idx)} className="small">Add Action</button>
          
          {scene.options.map((option, idxo) => (
            <div className="option">
              <input
                type="text"
                placeholder={`action`}
                value={option.name}
                onChange={this.handleOptionNameChange(idx, idxo)}
              />
              <select onChange={this.handleOptionToChange(idx, idxo)} value={option.to}>
                {this.state.scenes.map((scene, idx) => (
                  <option value={idx}>takes you to: scene ${idx + 1}</option>
                ))}
              </select>
              <button type="button" onClick={this.handleRemoveOption(idx, idxo)} className="small">-</button>
            </div>
          ))}
          </div>
        ))}
        <button type="button" onClick={this.handleAddScene} className="small">Add Scene</button>
        <button>Incorporate</button>
      </form>
    )
  }
}

export default CreateGame;