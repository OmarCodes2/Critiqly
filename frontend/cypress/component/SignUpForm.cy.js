import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';

describe('<SignUpForm />', () => {
  it('renders', () => {
    cy.mountWithRouter(<SignUpForm />);
  });
});