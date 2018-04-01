import React from 'react';
import css from 'react-css-modules';

import { Panel, Input, Button, ButtonGroup } from 'erlyeditor';
import styles from './styles';

export const Panels = () => (
  <div styleName='panel-demo'>
    <Panel>
      <Panel.Header>
        <ButtonGroup filled>
          <Button icon='add' />
          <Button icon='undo' />
          <Button icon='redo' />
        </ButtonGroup>
      </Panel.Header>
      <Panel.Content>
        {`hey! its me, your panel`}
      </Panel.Content>
      <Panel.Footer>
        {`footer`}
      </Panel.Footer>
    </Panel>

    <Panel filled>
      <Panel.Header>
        <ButtonGroup filled>
          <Button icon='add' />
          <Button icon='undo' />
          <Button icon='redo' />
        </ButtonGroup>
      </Panel.Header>
      <Panel.Content>
        {`hey! its me, your panel`}
      </Panel.Content>
      <Panel.Footer>
        {`footer`}
      </Panel.Footer>
    </Panel>
  </div>
);

export default css(Panels, styles);
