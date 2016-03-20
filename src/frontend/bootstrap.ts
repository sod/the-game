import './vendor';
import {createGame} from './game/game';
import {World} from './game/plugin/World';
import {Player} from './game/plugin/player';
import {State} from './game/utility/state';

const game = createGame();
const state = new State('default');

state.addPlugin(new World(game));
state.addPlugin(new Player(game));

state.start(game);
