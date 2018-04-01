import React from 'react';
import { Surface } from 'gl-react-dom';
import GL from 'gl-react';

import frag from './shader.frag';

const shaders = GL.Shaders.create({
  helloGL: { frag }
});

const HelloGL = GL.createComponent(({ width, height }) =>
  <GL.Node
    shader={shaders.helloGL}
    width={width}
    height={height}
  />,
  { displayName: 'HelloGL' }
);

export default () => (
  <Surface width={511} height={341}>
    <HelloGL blue={0.5} />
  </Surface>
);
