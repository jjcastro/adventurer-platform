import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameBox from "./GameBox";

import { Games } from '../api/games.js';

class Leaderboard extends Component {
  
    render(){
        return (
          <div>
            <h2>LATEST GAMES</h2>
            <div className="game-box-container">
              {this.props.games.map(function(listValue){
                return <GameBox key={listValue._id} game={listValue} />;
              })}
            </div>
          </div>
        );
    }
}
 
Leaderboard.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Leaderboard;