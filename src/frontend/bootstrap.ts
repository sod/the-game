import './vendor';
import {createGame} from './game/game';
import {World} from './game/plugin/World';
import {Player} from './game/plugin/player';
import {State} from './game/utility/state';
import {PluginContainer} from './game/utility/plugin-container';

const game = createGame();
const plugins = new PluginContainer();
const state = new State('default', plugins);

plugins.add(new World(game));
plugins.add(new Player(game));

state.start(game);
