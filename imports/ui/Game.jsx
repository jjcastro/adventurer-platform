import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSceneId: 123456,
            currentScene: undefined
        }
        this.handler = this.handler.bind(this)
    }

    handler(index) {
        this.setState({
            currentScene: this.props.currentGame.scenes[index]
        })
    }

    componentWillMount() {
        if (this.props.currentGame){
            this.setState({
                currentScene: this.props.currentGame.scenes[0]
            })
            console.log(this.props.currentGame.scenes);
        }
    }

    render(){
        var handler = this.handler;
        return(
            <div>
                <div>
                { this.state.currentScene ?
                    <div>{ this.state.currentScene.text }</div> : ''
                }
                </div>
                <ul>
                {this.state.currentScene.options.map(function(option, i){
                    return(<li key={i}>
                        <a href="#" onClick={() => handler(1)}>{option.text}</a>
                    </li>);
                })}
                </ul>
            </div>
        );
    }
}
Game.propTypes = {
    currentGame: PropTypes.object,
    activeGameId: PropTypes.object
};

export default createContainer((props) => {
  return {
    currentGame: Games.findOne(props.activeGameId),
  };
}, Game);