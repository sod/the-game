export const State = function(name, pluginContainer) {
    this.start = function(game: Phaser.Game) {
        game.state.add(name, this);
        game.state.start(name);
    };

    this.preload = function() {
        pluginContainer.invoke('preload');
    };

    this.create = function() {
        pluginContainer.invoke('create');
    };

    this.update = function() {
        pluginContainer.invoke('update');
    };

    this.render = function() {
        pluginContainer.invoke('render');
        pluginContainer.invoke('renderDebug');
    };
};
