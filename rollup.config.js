import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'esm',
                sourcemap: true,
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
            },
            {
                file: 'dist/index.umd.js',
                format: 'umd',
                name: 'allemandi.embedUtils',
                sourcemap: true,
                exports: 'named',
            },
        ],
        plugins: [
            terser(),
        ],
    },
    {
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];
