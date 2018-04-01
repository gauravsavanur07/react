import React, { PropTypes } from 'react';
import SourceContext from './SourceContext.js';

const { number, string, object } = PropTypes;
const frameStyle = {
};
const titleStyle = {
  margin: 0,
  color: '#fad733',
  fontSize: '1.4em',
  fontWeight: 'bold'
};

export const StackFrame = props => {
  const { filename, line, column, context } = props;

  return (
    <li style={frameStyle}>
      <h6 style={titleStyle}>{`${filename}:${line}:${column}`}</h6>
      {context && <SourceContext {...context} />}
    </li>
  );
};

StackFrame.propTypes = {
  filename: string.isRequired,
  line: number.isRequired,
  column: number.isRequired,
  context: object
};

export default StackFrame;
