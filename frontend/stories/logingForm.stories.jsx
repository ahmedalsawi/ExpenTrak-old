import React from "react"
import {
  storiesOf
} from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import {
  LoginForm
} from 'components';

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// bootswatch theme cosmo
import "assets/css/bootstrap.min.css";

import "App.css";


function login(e) {
  console.log(e)
}
storiesOf('Login', module)
  .addDecorator(StoryRouter())
  .add('params', () => ( <
    LoginForm login = {
      login
    }
    / >
  ));