import { cssOptions, paths } from '../utils';

export default [
  {
    test: /\.css$/,
    include: [
      paths.modules,
      paths.src
    ],
    loaders: [
      'style',
      `css?${cssOptions}`,
      'postcss'
    ]
  },
  {
    test: /\.js$/,
    include: /linebreak/,
    loader: 'transform?brfs'
  },
  {
    test: /\.js$/,
    loader: 'babel',
    include: [paths.src]
  }
];
