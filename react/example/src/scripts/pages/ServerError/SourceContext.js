import React, { PropTypes } from 'react';

const { number, string } = PropTypes;
const style = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.8rem',
  color: '#e8eff0',
  overflow: 'hidden'
};
const lineStyle = {
  fontWeight: 'bold',
  lineHeight: '2rem'
};
const preStyle = {
  backgroundColor: '#f15b5b'
};
const sourceStyle = {
  backgroundColor: '#ee3a3a',
  color: '#fff',
  fontSize: '2rem'
};
const postStyle = {
  backgroundColor: '#f15b5b'
};

export const SourceContext = ({ start, pre, line, post }) => (
  <pre style={style}>
    <span style={lineStyle}>{start}</span>
    <span style={preStyle}>{pre}</span>
    <span style={sourceStyle}>{line}</span>
    <span style={postStyle}>{post}</span>
  </pre>
);

SourceContext.propTypes = {
  start: number.isRequired,
  pre: string.isRequired,
  line: string.isRequired,
  post: string.isRequired
};

export default SourceContext;
