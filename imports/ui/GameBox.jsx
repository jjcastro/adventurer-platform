import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameOver from "./GameOver";
import Board from "./Board";

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class GameBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="game-box">
              <h3>//// {this.props.game.name} ////</h3>
              <p>{this.props.game.description}</p>
              <div className="score">
                <h4>SCORE:</h4>
                {[...Array(this.props.game.score)].map((x, i) =>
                  <span key={i}>☆</span>
                )}
              </div>
            </div>
        );
    }
}
GameBox.propTypes = {
    game: PropTypes.object,
};

export default GameBox;