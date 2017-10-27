import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Games } from '../api/games.js';

class GameOver extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="GameOver">
                <h1>Game Over</h1>
                <p>Thanks for playing!</p>
                <h3>Your score: {this.props.score}</h3>
                <h3>Players: {this.props.players.join(", ")}</h3>
                <br/>
                <h2>Refresh the page to start a new game</h2>
            </div>
        );
    }
}

GameOver.propTypes = {
    gameId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired
};
export default GameOver;