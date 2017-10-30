import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.addScore'(gameId, newScore) {
    check(gameId, String);
    check(newScore, Number);
    Games.update(gameId, {
      $inc: { sum: parseInt(newScore), votes: 1 },
    });
  },
  'games.insert'(game) {
    check(game, Object);
 
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Games.insert(game);
  },
});