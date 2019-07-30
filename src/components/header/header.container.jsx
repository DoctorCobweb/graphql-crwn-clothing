import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const HeaderContainer = () => (
  <Query query={GET_CART_HIDDEN}>
    {({ data: { cartHidden, currentUser }}) => (
      <Header
        hidden={cartHidden}
        currentUser={currentUser}
      />
    )}
  </Query>
);

export default HeaderContainer;