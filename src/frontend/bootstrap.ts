import {createGame} from './game/game';
import {player} from './game/plugin/player';
import './vendor';
import {expose} from './game/utility/expose';

createGame(function(game) {
    expose('game', game);
    expose('player', player(game));
});
