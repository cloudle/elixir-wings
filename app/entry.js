import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { store, history, destroy, insert, mutate } from './lib/stage';
import { Collection } from './lib/stage/collection';
import { wire } from './lib/wire';

ReactDOM.render(<Routes store={store} history={history}/>, document.getElementById('root'));
let wireInstance = wire('localhost:4000', {});
window.wire = wireInstance;

let insertQl = Relay.QL`
  mutation insertArticle ($id: String!, $title: String!, $content: String) {
    insertArticle (_id: $id, title: $title, content: $content) {
      title
      content
    }
  }
`;

let articles = window.articles = new Collection(store, wireInstance, 'articles', {
  insertGraph: insertQl.statement,
});

articles.query((Relay.QL`{ articles { title, content } }`).statement);

window.insertQl = insertQl.statement;
// articles.insert({title: 'Cloud'}, query.statement);
