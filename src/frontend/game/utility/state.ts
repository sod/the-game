const delegate = function(key, array) {
    array.forEach(function(object) {
        if (object[key]) {
            object[key]();
        }
    });
};

export const State = function(name) {
    const plugins = new Set;

    this.addPlugin = function(plugin) {
        plugins.add(plugin)
    };

    this.start = function(game: Phaser.Game) {
        game.state.add(name, this);
        game.state.start(name);
    };

    this.preload = function() {
        delegate('preload', plugins);
    };

    this.create = function() {
        delegate('create', plugins);
    };

    this.update = function() {
        delegate('update', plugins);
    };

    this.render = function() {
        delegate('render', plugins);
    };
};
