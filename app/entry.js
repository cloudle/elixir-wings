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
  mutation insertArticle ($id: ID!, $title: String!, $content: String) {
    insertArticle (id: $id, title: $title, content: $content) {
      id, title, content
    }
  }
`;

let updateQl = Relay.QL`
  mutation updateArticle($id: ID!, $title: String, $content: String) {
    updateArticle(id: $id, title: $title, content: $content) {
      status { error, message }
      payload {
        ...on Article {
          id, title, content
        }
      }
    }
  }
`;

let destroyQl = Relay.QL`
  mutation destroyArticle($id: ID!) {
    destroyArticle(id: $id) {
      status { error, message }
    }
  }
`;

let articles = window.articles = new Collection(store, wireInstance, 'articles', {
  insertGraph: insertQl.statement,
  updateGraph: updateQl.statement,
  destroyGraph: destroyQl.statement,
});

articles.query((Relay.QL`{ articles { id, title, content } }`).statement);

window.insertQl = insertQl.statement;
// articles.insert({title: 'Cloud'}, query.statement);
