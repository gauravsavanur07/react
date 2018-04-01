import React, { Component, PropTypes } from 'react';

const { node } = PropTypes;

export default ComposedComponent => class extends Component {
  static propTypes = { children: node };
  state = { hovered: false };

  focus = () => this.setState({ hovered: true });
  unfocus = () => this.setState({ hovered: false });

  render() {
    return (
      <div onMouseEnter={this.focus} onMouseLeave={this.unfocus}>
        <ComposedComponent {...this.props} hovered={this.state.hovered} />
      </div>
    );
  }
};
