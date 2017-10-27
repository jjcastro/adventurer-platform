import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

import BoardContainer from "./BoardContainer.jsx";
import Leaderboard from "./Leaderboard.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
    constructor(props){
        super(props);
        this.height = 600;
        this.width = 600;
        this.state = {
            activeGameId: undefined
        }
    }
    
    render(){
        return(
            <div className="App">
                <div className="login">
                    <AccountsUIWrapper />
                </div>
                <header>
                <pre>{`
           _______      ________ _   _ _______ _    _ _____  ______ _____ 
     /\\   |  __ \\ \\    / /  ____| \\ | |__   __| |  | |  __ \\|  ____|  __ \\
    /  \\  | |  | \\ \\  / /| |__  |  \\| |  | |  | |  | | |__) | |__  | |__) |
   / /\\ \\ | |  | |\\ \\/ / |  __| | . \` |  | |  | |  | |  _  /|  __| |  _  / 
  / ____ \\| |__| | \\  /  | |____| |\\  |  | |  | |__| | | \\ \\| |____| | \\ \\ 
 /_/    \\_\\_____/   \\/   |______|_| \\_|  |_|   \\____/|_|  \\_\\______|_|  \\_\\

                     __                                         _
                    (  )                         ,---.          U
                     ||                         ;     \\         ;
                     ||                    .==\\"/==.   \`-.___.-'
                 ___|""|__.._             ((+) .  .:)
                /____________\\            |'.-(o)-.'|
                \\____________/~~~.        \\/  \\_/  \\/

                `}</pre>
                </header>
                
                <hr className="header-bar" />



                { this.props.currentUser ?
                    <BoardContainer width={this.width} height={this.height} potentialGame={this.props.potentialGame}/> :
                    <h3 className="Invitation">SIGN IN TO CREATE / PLAY GAMES!</h3>
                }
                <Leaderboard games={this.props.games}/>
            </div>
        );
    }
}

App.propTypes = {
  games: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  potentialGame: PropTypes.object,
};

export default createContainer((props) => {
  return {
    games: Games.find({  }, { sort: { score: -1 }, limit: 10 }).fetch(),
    currentUser: Meteor.user(),
    potentialGame: Games.findOne({ users: { $size: 1 }, gameOver: false })
  };
}, App);