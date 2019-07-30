import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import { default as App } from './App.container';
// import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

//establish the connection to our backend
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});


// the cache is the local storage
const cache = new InMemoryCache();

// await before instantiating ApolloClient, else queries might run before cache is persisted

// await persistCache({
// cache,
// storage: window.localStorage,
// });


(async () => {
  await persistCache({
  cache,
  storage: window.localStorage,
})
})();

const client = new ApolloClient({
  link: httpLink, // know what to request to
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    cartTotalAmount: 0,
    currentUser: null,
  }
})

// WE JUST GET A PROMISE BACK..
// client.query({
//   query: gql`
//     {
//       getCollectionsByTitle(title: "hats") {
//         id
//         title
//         items {
//           id
//           name
//           price
//           imageUrl
//         }
//       }
//     }
//   `
// }).then(response => console.log(response));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
