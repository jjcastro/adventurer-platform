import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

import Game from "./Game.jsx";
import CreateGame from "./CreateGame.jsx";
import Leaderboard from "./Leaderboard.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeGameId: undefined,
            creating: true
        }
        this.handler = this.handler.bind(this)
    }

    handler(someArg) {
        this.setState({
          activeGameId: someArg
        });

        console.log(someArg);

        alert(typeof(someArg));
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


                { this.state.creating ?
                    <CreateGame/> :
                    <div>
                        { this.props.currentUser ?
                            <a href="#"> CREATE NEW GAME</a> :
                            <h3 className="Invitation">SIGN IN TO CREATE / PLAY GAMES!</h3>
                        }
                        { this.state.activeGameId ?
                            <Game activeGameId={this.state.activeGameId} /> : 
                            <Leaderboard games={this.props.games} handler={this.handler}/>
                        }
                    </div>
                }
            </div>
        );
    }
}

App.propTypes = {
  games: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default createContainer((props) => {
  return {
    games: Games.find({  }, { sort: { score: -1 }, limit: 10 }).fetch(),
    currentUser: Meteor.user()
  };
}, App);