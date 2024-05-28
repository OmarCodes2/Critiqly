import { mount } from 'cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';

Cypress.Commands.add('mountWithRouter', (component) => {
  return mount(<Router>{component}</Router>);
});