import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameOver from "./GameOver";

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class Board extends Component {
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

    componentDidMount(){
        this.canv();

        this.createFood();
        this.createSnake();
        setInterval(this.showSnake.bind(this), 100);
    }
    componentWillMount(){
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        if (this.props.currentGame) {
            Games.update(this.props.currentGame._id, {
              $set: { gameOver: false },
            });
        }
    }

    canv() {
        if (this.canvas === null || this.canvas === undefined){}
        else {
            let ctx = this.canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, this.props.width, this.props.height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, this.props.width, this.props.height);
        }
    }
    createSnake(){
        const len = 5;
        let s = this.props.currentGame.snake;
        for (let i = len-1; i>=0; i--){
            s.push({x:i, y:0});
        }
        // this.setState({
        //     snake:s
        // });
        Games.update(this.props.currentGame._id, {
          $set: { snake: s },
        });
        console.log(this.props.currentGame.snake.length);
    }
    changeDirection(ndir){
        // this.setState({
        //     dir:ndir
        // });

        Games.update(this.props.currentGame._id, {
          $set: { dir:ndir },
        });

    }
    gameOver(){
        // this.setState({
        //     gameOver:true
        // });

        Games.update(this.props.currentGame._id, {
          $set: { gameOver:true },
        });
    }
    moveSnake(){
        let s = this.props.currentGame.snake;
        let nx = s[0].x;
        let ny = s[0].y;
        let d = this.props.currentGame.dir;

        switch (d){
            case "up":
                ny--;
                break;
            case "down":
                ny++;
                break;
            case "left":
                nx--;
                break;
            case "right":
                nx++;
                break;
        }
        if(nx===-1 || ny===-1 || nx=== this.props.width/10 || ny=== this.props.height/10 || this.collision(nx, ny)){
            this.gameOver();
            console.log(this.props.currentGame.gameOver);
        }

        const tail = {x: nx, y:ny};
        if(nx === this.props.currentGame.food.x && ny === this.props.currentGame.food.y){
            this.createFood();
            this.addPoints();
        }else{
            s.pop();
        }
        s.unshift(tail);

        // this.setState({
        //     snake:s
        // });

        Games.update(this.props.currentGame._id, {
          $set: { snake:s },
        });
    }

    showSnake(){
        if (this.canvas === null || this.canvas === undefined){}
        else {
            this.canv();
            this.moveSnake();
            for (let i = 0; i < this.props.currentGame.snake.length; i++) {
                let c = this.props.currentGame.snake[i];
                this.paintCell("green", c);
            }
            this.paintCell("red", this.props.currentGame.food);
        }
    }

    handleKeyDown(event){
        event.preventDefault();
        let ndir = this.props.currentGame.dir;
        if(event.keyCode === 37 && ndir!== "right") ndir = "left";
        else if(event.keyCode === 38 && ndir!== "down") ndir = "up";
        else if(event.keyCode === 39 && ndir!== "left") ndir = "right";
        else if(event.keyCode === 40 && ndir!== "up") ndir = "down";
        this.changeDirection(ndir);
    }

    createFood(){
        const food = {
            x: Math.round(Math.random()* (this.props.width-10)/10),
            y: Math.round(Math.random()* (this.props.height-10)/10)
        };
        // this.setState({
        //     food: food
        // });

        Games.update(this.props.currentGame._id, {
          $set: { food: food },
        });

    }
    addPoints(){
        // this.setState({
        //     score: this.props.currentGame.score+10
        // });
        Games.update(this.props.currentGame._id, {
          $set: { score: this.props.currentGame.score+10 },
        });
        console.log(this.props.currentGame.score);
    }
    collision(x, y){
        const s = this.props.currentGame.snake;
        for (let i=0; i<s.length; i++ ){
            if( s[i].x === x && s[i].y === y) return true;
        }
        return false;
    }

    paintCell(color, cell){
        if (this.canvas === null || this.canvas === undefined){}
        else {
            const ctx = this.canvas.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(cell.x * 10, cell.y * 10, 10, 10);
        }
    }

    render(){
        return(
            <div className="Board">
                {!this.props.currentGame.gameOver ?
                    <div>
                        <span>Current players: {this.props.currentGame.usernames.join(", ")}</span>
                        <p>Score: {this.props.currentGame.score}</p>
                        <canvas
                            width={this.props.width}
                            height={this.props.height}
                            ref={(c) => this.canvas = c}>
                        </canvas>
                    </div>:
                    <GameOver gameId={this.props.currentGame._id} score={this.props.currentGame.score} players={this.props.currentGame.usernames}/>
                }
            </div>
        );
    }
}
Board.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    activeGameId: PropTypes.string.isRequired,
    currentGame: PropTypes.object
};

export default createContainer((props) => {
  return {
    currentGame: Games.findOne(props.activeGameId),
  };
}, Board);