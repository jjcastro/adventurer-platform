import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameBox from "./GameBox";

import { Games } from '../api/games.js';

class Leaderboard extends Component {
  
    render(){
      var handler = this.props.handler;
        return (
          <div>
            <div>
              <h2>LATEST GAMES</h2>
              <div className="game-box-container">
                {this.props.games.map(function(listValue){
                  return <GameBox key={listValue._id} game={listValue} handler={handler}/>;
                })}
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        );
    }
}
 
Leaderboard.propTypes = {
  games: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired
};

export default Leaderboard;