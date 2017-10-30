import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class GameBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        var handler = this.props.handler;
        var votes = this.props.game.votes;
        var sum = this.props.game.sum;
        var avg = votes == 0 ? 0 : sum / votes;
        console.log(avg);
        return(
            <div className="game-box">
              <h3>//// {this.props.game.name} ////</h3>
              <p>{this.props.game.description}</p>
              <p><u>Author:</u> {this.props.game.creator}</p>
              <div className="score">
                <h4>SCORE:</h4>
                {[...Array(parseInt(avg))].map((x, i) =>
                  <span key={i}>☆</span>
                )}
                <button onClick={() => handler(this.props.game._id)}>PLAY</button>
              </div>
            </div>
        );
    }
}
GameBox.propTypes = {
    game: PropTypes.object,
    handler: PropTypes.func.isRequired,
};

export default GameBox;