import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Html from 'server/templates/Html';
import ServerError from 'pages/ServerError';

import {
  loadAssets,
  formatError
} from 'server/utils';

const assets = loadAssets();
const { renderToString } = ReactDOMServer;

export default (store, routerProps) => {
  const root = (
    <Provider store={store}>
      <RouterContext {...routerProps} />
    </Provider>
  );

  let body;
  try {
    body = renderToString(root);
  } catch (err) {
    const formattedError = formatError(err);
    body = renderToString(<ServerError {...formattedError} />);
  }

  const props = {
    state: store.getState(),
    body,
    assets
  };

  const html = <Html {...props } />;
  const content = renderToString(html);

  return `<!doctype html>\n${content}`;
};
