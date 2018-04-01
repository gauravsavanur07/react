import stackman from 'stackman';

const getContext = frame => ({
  start: frame.getLineNumber() - (frame.context.pre || []).length,
  pre: frame.context.pre.join('\n'),
  line: frame.context.line,
  post: frame.context.post.join('\n')
});

const getFrame = frame => ({
  filename: frame.getRelativeFileName(),
  line: frame.getLineNumber(),
  column: frame.getColumnNumber(),
  context: frame.context ? getContext(frame) : null
});

const format = stack => ({ frames: stack.frames.map(getFrame) });

export default (err, options = {}) => {
  const stack = stackman({ ...options, sync: true })(err);
  const result = format(stack);
  result.message = err.message || err.toString();

  return result;
};
