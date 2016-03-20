const methods = ['preload', 'create', 'update', 'render', 'renderDebug'];
const noop = function() {

};

export class PluginContainer {
    private plugins = new Set;

    add(plugin) {
        methods.forEach(function(method) {
            if (!plugin[method]) {
                plugin[method] = noop;
            }
        });

        this.plugins.add(plugin);
    };

    invoke(method) {
        this.plugins.forEach(function(plugin) {
            plugin[method]();
        });
    };
}
