export const resources = 'src/frontend/';
export const node = 'node_modules/';
export const output = 'public/';

export const typescript = {
    build: {
        base: `${resources}`,
        typedefFile: `typings/main.d.ts`,
        source: [
            `${resources}*.ts`,
            `${resources}**/*.ts`,
        ],
        destination: `${output}compiled`,
        compileroptions: {
            module: 'commonjs',
            target: 'ES5',
            moduleResolution: 'node',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false,
            noEmitOnError: false,
            noExternalResolve: false,
            isolatedModules: false,
            typescript: require('typescript'),
        }
    },
    clean: [
        `${output}/compiled/**/*.?(js|map)`,
        `${output}/compiled/*.?(js|map)`,
    ],
    watch: [
        `${resources}*.ts`,
        `${resources}**/*.ts`
    ]
};
