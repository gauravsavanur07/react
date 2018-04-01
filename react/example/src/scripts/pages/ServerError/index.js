import React, { PropTypes } from 'react';

import StackFrame from './StackFrame.js';

const { string, array } = PropTypes;

const getFrameKey = ({ filename, line, column }) => `${filename}:${line}:${column}`;
const style = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1em',
  backgroundColor: '#f05050',
  color: '#e8eff0'
};
const messageStyle = {
  color: '#e8eff0',
  fontSize: '2.4rem'
};
const listStyle = {
  listStyle: 'none'
};

export const ServerError = ({ message, frames }) => (
  <section style={style}>
    <h4 style={messageStyle}>{message}</h4>
    <ul style={listStyle}>{
      frames.map(frame => <StackFrame key={getFrameKey(frame)} {...frame} />)
    }</ul>
  </section>
);

ServerError.propTypes = {
  message: string.isRequired,
  frames: array
};

export default ServerError;
