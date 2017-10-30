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
        const handlerVote = this.props.handlerVote;
        return(
            <div>
                <h3>You're playing: {this.props.currentGame.name}</h3>
                <select onChange={handlerVote}>
                    <option selected disabled>RATE GAME</option>
                    <option value={5}>☆☆☆☆☆</option>
                    <option value={4}>☆☆☆☆</option>
                    <option value={3}>☆☆☆</option>
                    <option value={2}>☆☆</option>
                    <option value={1}>☆</option>
                </select>
                <hr className="header-bar"/>
                <h3>Current scene:</h3>
                <div className="current-scene">
                { this.state.currentScene ?
                    <div>{ this.state.currentScene.text }</div> : ''
                }
                </div>
                <h3>What do you do?</h3>
                <ul className="scene-options">
                {this.state.currentScene.options.map(function(option, i){
                    return(<li key={i}>
                        <button onClick={() => handler(option.to)}>{option.name}</button>
                    </li>);
                })}
                </ul>
            </div>
        );
    }
}
Game.propTypes = {
    currentGame: PropTypes.object,
    activeGameId: PropTypes.object,
    handlerVote: PropTypes.func
};

export default createContainer((props) => {
  Meteor.subscribe('games');
  return {
    currentGame: Games.findOne(props.activeGameId),
  };
}, Game);