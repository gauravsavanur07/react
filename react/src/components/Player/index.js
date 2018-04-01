import clamp from 'lodash/clamp';
import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import css from 'react-css-modules';
import { HotKeys } from 'react-hotkeys';

import {
  videoProps,
  videoAPIShape,
  playbackRateShape,
  playerActionsShape
} from '../propTypes';

import hoverable from '../hoc/hoverable';
import HUD from './HUD';
import Info from './Info';
import SeekBar from './SeekBar';
import Overlay from './Overlay';
import Controls from './Controls';

import styles from './styles';

const {
  bool,
  number,
  string,
  node,
  shape
} = PropTypes;

const vimKeyMap = {
  rewind10: 'h',
  forward10: 'l',
  rewind30: 'ctrl+h',
  forward30: 'ctrl+l',
  decreasePlaybackRate: 'shift+h',
  increasePlaybackRate: 'shift+l',
  togglePlay: 'p'
};

export class Player extends Component {
  static propTypes = {
    className: string,
    children: node,

    debug: bool,
    hovered: bool,
    width: number,
    height: number,
    playbackRate: playbackRateShape,

    actions: playerActionsShape.isRequired,
    api: videoAPIShape.isRequired,
    video: shape(videoProps).isRequired
  };

  static defaultProps = {
    debug: Boolean(__DEVELOPMENT__),
    width: 640,
    playbackRate: {
      step: 0.25,
      min: 0.25,
      max: 4
    }
  };

  handleDecreasePlaybackRate = () => this.setPlaybackRate(-1);
  handleIncreasePlaybackRate = () => this.setPlaybackRate(+1);

  setPlaybackRate = factor => {
    const {
      video,
      api,
      playbackRate: {
        min,
        max,
        step
      }
    } = this.props;

    const value = clamp(video.playbackRate + step * factor, min, max);
    api.setPlaybackRate(value);
  };

  renderContainer() {
    if (!React.Children.count) return null;

    const {
      children,
      debug,
      video,
      api,
      hovered
    } = this.props;

    return (
      <div styleName='container'>
        {children}
        <Overlay {...video} debug={debug} onTogglePlay={api.togglePlay}>
          <HUD {...video} hovered={hovered} />
        </Overlay>
      </div>
    );
  }

  render() {
    const {
      className,
      width,
      height,
      actions,
      api,
      video,
      hovered
    } = this.props;

    const keyboardHandlers = {
      togglePlay: api.togglePlay,
      decreasePlaybackRate: this.handleDecreasePlaybackRate,
      increasePlaybackRate: this.handleIncreasePlaybackRate
    };

    return (
      <HotKeys tabIndex={0}
        keyMap={vimKeyMap}
        handlers={keyboardHandlers}
        className={className}
        styleName='player'
        style={{ width, height }}
      >
        {this.renderContainer()}
        <SeekBar {...video}
          disabled={Boolean(video.error)}
          step={1}
          onSeek={api.seek}
        />
        <Info />
        <Controls {...video}
          error={Boolean(video.error)}
          visible={hovered}
          onToggleDebugMonitor={actions.toggleDebugMonitor}
          onVolumeChange={api.setVolume}
          onTogglePlay={api.togglePlay}
          onToggleMute={api.toggleMute}
          onToggleLoop={api.toggleLoop}
          onToggleFullScreen={api.toggleFullScreen}
          onDecreasePlaybackRate={this.handleDecreasePlaybackRate}
          onIncreasePlaybackRate={this.handleIncreasePlaybackRate}
        />
      </HotKeys>
    );
  }
}

export default compose(
  hoverable,
  css(styles, { allowMultiple: true })
)(Player);
