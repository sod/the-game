export const bounds = {
    width: ():number => 1000,
    height: ():number => 1000
};

export const canvas = {
    width: ():number => 400 || window.innerWidth,
    height: ():number => 400 || window.innerHeight
};

export const resolution = function() {
    return window.devicePixelRatio;
};

export const real = {
    height: (value: number): number => resolution() * value,
    width: (value: number): number => resolution() * value
};
