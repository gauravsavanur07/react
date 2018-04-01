import pick from 'lodash/pick';
import { throttle } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import * as storage from '../../lib/storage';

import {
  videoProps,
  videoOwnProps,
  videoActionsShape
} from '../propTypes';

import styles from './styles';

const { string, node, func } = PropTypes;

/*
 * HTML 5 video player wrapper.
*/
export default class Html5Video extends Component {
  static propTypes = {
    ...videoProps,
    actions: videoActionsShape.isRequired,
    className: string,
    children: node,
    onTimeUpdate: func
  };

  static defaultProps = {
    preload: 'metadata',
    autoPlay: false,
    controls: false
  };

  constructor(props) {
    super(props);

    this.handleProgress = this.handleProgress.bind(this);
    this.handleSuspend = this.handleSuspend.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentDidMount() {
    this.video.addEventListener('loadstart', this.handleLoadStart);
    this.video.addEventListener('progress', this.handleProgress);
    this.video.addEventListener('suspend', this.handleSuspend);
    this.video.addEventListener('abort', this.handleAbort);
    if (this.video.children.length) {
      const source = this.video.children[this.video.children.length - 1];
      source.addEventListener('error', this.handleError);
    } else {
      this.video.addEventListener('error', this.handleError);
    }
    this.video.addEventListener('emptied', this.handleEmptied);
    this.video.addEventListener('stalled', this.handleStalled);
    this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.video.addEventListener('canplay', this.handleCanPlay);
    this.video.addEventListener('canplaythrough', this.handleCanPlayThrough);
    this.video.addEventListener('playing', this.handlePlaying);
    this.video.addEventListener('waiting', this.handleWaiting);
    this.video.addEventListener('seeking', this.handleSeeking);
    this.video.addEventListener('seeked', this.handleSeeked);
    this.video.addEventListener('ended', this.handleEnded);
    this.video.addEventListener('durationchange', this.handleDurationChange);
    this.video.addEventListener('timeupdate', this.handleTimeUpdate);
    this.video.addEventListener('play', this.handlePlay);
    this.video.addEventListener('pause', this.handlePause);
    this.video.addEventListener('ratechange', this.handleRateChange);
    this.video.addEventListener('resize', this.handleResize);
    this.video.addEventListener('volumechange', this.handleVolumeChange);

    this.props.actions.init({
      readyState: this.video.readyState,
      networkState: this.video.networkState,
      duration: this.video.duration
    });
  }

  componentWillUnmount() {
    this.video.removeEventListener('loadstart', this.handleLoadStart);
    this.video.removeEventListener('progress', this.handleProgress);
    this.video.removeEventListener('suspend', this.handleSuspend);
    this.video.removeEventListener('abort', this.handleAbort);
    if (this.video.children.length) {
      const source = this.video.children[this.video.children.length - 1];
      source.removeEventListener('error', this.handleError);
    } else {
      this.video.removeEventListener('error', this.handleError);
    }
    this.video.removeEventListener('emptied', this.handleEmptied);
    this.video.removeEventListener('stalled', this.handleStalled);
    this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.video.removeEventListener('canplay', this.handleCanPlay);
    this.video.removeEventListener('canplaythrough', this.handleCanPlayThrough);
    this.video.removeEventListener('playing', this.handlePlaying);
    this.video.removeEventListener('waiting', this.handleWaiting);
    this.video.removeEventListener('seeking', this.handleSeeking);
    this.video.removeEventListener('seeked', this.handleSeeked);
    this.video.removeEventListener('ended', this.handleEnded);
    this.video.removeEventListener('durationchange', this.handleDurationChange);
    this.video.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.video.removeEventListener('play', this.handlePlay);
    this.video.removeEventListener('pause', this.handlePause);
    this.video.removeEventListener('ratechange', this.handleRateChange);
    this.video.removeEventListener('resize', this.handleResize);
    this.video.removeEventListener('volumechange', this.handleVolumeChange);
  }

  // API

  toggleMute() {
    this.video.muted = !this.video.muted;
    storage.save('html5video.muted', this.video.muted);
  }

  toggleLoop() {
    this.video.loop = !this.video.loop;
    storage.save('html5video.loop', this.video.loop);
    this.props.actions.toggleLoop(this.video.loop);
  }

  togglePlay() {
    if (this.props.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  toggleFullScreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  setVolume(volume) {
    this.video.volume = volume;
    storage.save('html5video.volume', this.video.volume);
  }

  setPlaybackRate(value) {
    this.video.playbackRate = value;
    storage.save('html5video.playbackRate', this.video.playbackRate);
  }

  seek = offset => this.video.currentTime = offset;

  // Handlers

  handleLoadStart = () => this.props.actions.loadStart(this.video.networkState);

  @throttle(1500)
  handleProgress() {
    if (!this.video.buffered.length) return;

    const bufferedTime = this.video.buffered.end(this.video.buffered.length - 1);
    this.props.actions.progress(this.video.networkState, bufferedTime);
  }

  @throttle(1500)
  handleSuspend() {
    this.props.actions.suspend(this.video.networkState);
  }

  handleAbort = () => this.props.actions.abort(this.video.networkState, this.video.error.code);
  handleError = () => this.props.actions.error(this.video.networkState, this.video.error.code);
  handleEmptied = () => this.props.actions.emptied(this.video.networkState);
  handleStalled = () => this.props.actions.stalled(this.video.networkState);

  handleLoadedMetadata = () => {
    this.props.actions.loadedMetadata({
      readyState: this.video.readyState,
      duration: this.video.duration,
      size: this.getSize()
    });
  };

  handleLoadedData = () => this.props.actions.loadedData(this.video.readyState);
  handleCanPlay = () => this.props.actions.canPlay(this.video.readyState);
  handleCanPlayThrough = () => this.props.actions.canPlayThrough(this.video.readyState);
  handlePlaying = () => this.props.actions.playing(this.video.readyState);
  handleWaiting = () => this.props.actions.waiting(this.video.readyState);
  handleSeeking = () => this.props.actions.seeking(this.video.currentTime);
  handleSeeked = () => this.props.actions.seeked(this.video.currentTime);
  handleEnded = () => this.props.actions.ended(this.video.currentTime);
  handleDurationChange = () => this.props.actions.durationChange(this.video.duration);

  @throttle(500)
  handleTimeUpdate() {
    if (this.props.onTimeUpdate) this.props.onTimeUpdate();
    this.props.actions.timeUpdate(this.video.currentTime);
  }

  handlePlay = () => this.props.actions.play();
  handlePause = () => this.props.actions.pause();
  handleRateChange = () => this.props.actions.rateChange(this.video.playbackRate);

  handleResize = () => this.props.actions.resize({
    readyState: this.video.readyState,
    size: this.getSize()
  });

  @throttle(10)
  handleVolumeChange() {
    this.props.actions.volumeChange(
      this.video.volume,
      this.video.muted
    );
  }

  getSize() {
    return {
      width: this.video.width,
      height: this.video.height,
      videoWidth: this.video.videoWidth,
      videoHeight: this.video.videoHeight
    };
  }

  // Rendering

  renderSources = () => React.Children.map(
    this.props.children,
    c => c.type === 'source' ? c : void 0
  );

  render() {
    const { className, ...props } = this.props;
    const ownProps = pick(props, Object.keys(videoOwnProps));

    return (
      <video styleName='video' className={className}
        ref={ref => this.video = ref} {...ownProps}>
        {this.renderSources()}
      </video>
    );
  }
}

export default css(Html5Video, styles, { allowMultiple: true });
