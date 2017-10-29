import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameOver from "./GameOver";

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class Scene extends Component {
    constructor(props) {
        super(props);
        this.scale = 10;
        this.state = {
            // game: {}
        }

        console.log(this.props.currentGame);
        if (!this.props.currentGame.users.includes(Meteor.userId())) {
            let users = this.props.currentGame.users;
            let usernames = this.props.currentGame.usernames;
            users.push(Meteor.userId());
            usernames.push(Meteor.user().username);

            Games.update(this.props.currentGame._id, {
              $set: { users: users,
                  usernames: usernames
              },
            });
        }
    }

    render(){
        return(
            <div className="Scene">
                { this.props.currentScene.text }
            </div>
        );
    }
}
Scene.propTypes = {
    currentScene: PropTypes.object
};

export default Scene;