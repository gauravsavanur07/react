import { Route, IndexRoute } from 'react-router';

import * as layouts from 'layouts';
import * as pages from 'pages';

export default (
  <Route path='/' component={layouts.base}>
    <IndexRoute component={pages.demoIndex} />
    <Route path='/ui-kit' component={pages.uiKit}>
      <Route path='icons' component={pages.uiKit.Icons} />
      <Route path='badges' component={pages.uiKit.Badges} />
      <Route path='buttons' component={pages.uiKit.Buttons} />
      <Route path='button-groups' component={pages.uiKit.ButtonGroups} />
      <Route path='inputs' component={pages.uiKit.Inputs} />
      <Route path='lists' component={pages.uiKit.Lists} />
      <Route path='panels' component={pages.uiKit.Panels} />
      <Route path='sliders' component={pages.uiKit.Sliders} />
      <Route path='tooltips' component={pages.uiKit.Tooltips} />
    </Route>
    <Route path='/html5-video-demo' component={pages.html5VideoDemo} />
    <Route path='/player-demo' component={pages.playerDemo} />
    <Route path='/editor-demo' component={pages.editorDemo} />
    <Route path='/dnd-tutorial' component={pages.dndTutorial} />
    <Route path='/dnd-naive-drag-demo' component={pages.dndNaiveDragDemo} />
    <Route path='/dnd-custom-layer-demo' component={pages.dndCustomLayerDemo} />
    <Route path='/designer-demo' component={pages.designerDemo} />
    <Route path='/react-gl-demo' component={pages.reactGLDemo} />
    <Route path='*' component={pages.notFound} status={404} />
  </Route>
);
