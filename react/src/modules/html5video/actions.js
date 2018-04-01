import { createAction as action } from 'redux-act';
import c from './constants';

const mapReadyState = readyState => ({ readyState });
const mapNetworkState = networkState => ({ networkState });
const mapError = (networkState, errorCode) => ({ networkState, errorCode });
const mapCurrentTime = currentTime => ({ currentTime });

export const init = action(c.VIDEO_INIT);

export const loadStart = action(c.VIDEO_LOAD_START, mapNetworkState);
export const progress = action(c.VIDEO_PROGRESS,
  (networkState, bufferedTime) => ({ networkState, bufferedTime })
);
export const suspend = action(c.VIDEO_SUSPEND, mapNetworkState);
export const abort = action(c.VIDEO_ABORT, mapError);
export const error = action(c.VIDEO_ERROR, mapError);
export const emptied = action(c.VIDEO_EMPTIED, mapNetworkState);
export const stalled = action(c.VIDEO_STALLED, mapNetworkState);
export const loadedMetadata = action(c.VIDEO_LOADED_METADATA);
export const loadedData = action(c.VIDEO_LOADED_DATA, mapReadyState);
export const canPlay = action(c.VIDEO_CAN_PLAY, mapReadyState);
export const canPlayThrough = action(c.VIDEO_CAN_PLAY_THROUGH, mapReadyState);
export const playing = action(c.VIDEO_PLAYING, mapReadyState);
export const waiting = action(c.VIDEO_WAITING, mapReadyState);
export const seeking = action(c.VIDEO_SEEKING, mapCurrentTime);
export const seeked = action(c.VIDEO_SEEKED, mapCurrentTime);
export const ended = action(c.VIDEO_ENDED, mapCurrentTime);
export const durationChange = action(c.VIDEO_DURATION_CHANGE, duration => ({ duration }));
export const timeUpdate = action(c.VIDEO_TIME_UPDATE,
  (currentTime, duration) => ({ currentTime, duration }));
export const play = action(c.VIDEO_PLAY);
export const pause = action(c.VIDEO_PAUSE);
export const rateChange = action(c.VIDEO_RATE_CHANGE, playbackRate => ({ playbackRate }));
export const resize = action(c.VIDEO_RESIZE);
export const volumeChange = action(c.VIDEO_VOLUME_CHANGE, (volume, muted) => ({ volume, muted }));
export const toggleLoop = action(c.VIDEO_TOGGLE_LOOP, loop => ({ loop }));
