import React, { Component, PropTypes } from 'react';
import { RouteTransition } from 'react-router-transition';
import css from 'react-css-modules';

import Icons from './Icons';
import Badges from './Badges';
import Buttons from './Buttons';
import ButtonGroups from './ButtonGroups';
import Inputs from './Inputs';
import Lists from './Lists';
import Panels from './Panels';
import Sliders from './Sliders';
import Tooltips from './Tooltips';

import Navigation from './Navigation';
import styles from './styles';

const { node } = PropTypes;

// TODO: add page transitions with react-router-transition
// example animations: https://github.com/codrops/PageTransitions

export class UIKit extends Component {
  static propTypes = {
    children: node
  };

  render() {
    const { children } = this.props;

    return (
      <div styleName='root'>
        <nav styleName='navigation'>
          <Navigation />
        </nav>
        <section styleName='content'>
          {children}
        </section>
      </div>
    );
  }
}

UIKit.Icons = Icons;
UIKit.Badges = Badges;
UIKit.Buttons = Buttons;
UIKit.ButtonGroups = ButtonGroups;
UIKit.Inputs = Inputs;
UIKit.Lists = Lists;
UIKit.Panels = Panels;
UIKit.Sliders = Sliders;
UIKit.Tooltips = Tooltips;

export default css(UIKit, styles);
