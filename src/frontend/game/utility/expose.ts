const game = (<any>window).game = {};

export const expose = function(key, value) {
    game[key] = value;
};
