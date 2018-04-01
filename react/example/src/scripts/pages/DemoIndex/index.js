import React from 'react';
import css from 'react-css-modules';
import { Link } from 'react-router';

import styles from './styles';

export const Index = () => (
  <div styleName='page'>
    <h1 styleName='title'>{'Demos'}</h1>
    <ul styleName='demos'>
      <li><Link styleName='link' to={'/ui-kit'}>{`UI kit`}</Link></li>
      <li><Link styleName='link' to={'/html5-video-demo'}>{`Html5Video component demo`}</Link></li>
      <li><Link styleName='link' to={'/player-demo'}>{`Player component demo`}</Link></li>
      <li><Link styleName='link' to={'/editor-demo'}>{`Editor component demo`}</Link></li>
      <li><Link styleName='link' to={'/dnd-naive-drag-demo'}>{`DnD naive drag demo`}</Link></li>
      <li><Link styleName='link' to={'/dnd-custom-layer-demo'}>{`DnD custom layer demo`}</Link></li>
      <li><Link styleName='link' to={'/react-gl-demo'}>{`react-gl demo`}</Link></li>
      <li>
        <Link styleName='link' to={'/dnd-tutorial'}>
          {`react-dnd tutorial (chess knight)`}
        </Link>
      </li>
      <li>
        <Link styleName='link' to={'/designer-demo'}>
          {`designer playground`}
        </Link>
      </li>
    </ul>
  </div>
);

export default css(Index, styles);
