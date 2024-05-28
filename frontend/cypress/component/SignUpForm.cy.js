import React from 'react';
import SignUpForm from '../../src/components/Forms/SignUpForm';

describe('<SignUpForm />', () => {
  it('renders', () => {
    cy.mountWithRouter(<SignUpForm />);
  });
});