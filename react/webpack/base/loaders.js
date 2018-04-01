import { paths } from '../utils';

export default [
  {
    test: /\.svg(\?.+)?$/,
    include: [paths.src],
    loader: 'file'
  },
  {
    test: /\.(glsl|frag|vert)$/,
    loaders: ['raw', 'glslify'],
    include: [
      paths.modules,
      paths.src
    ]
  }
];
