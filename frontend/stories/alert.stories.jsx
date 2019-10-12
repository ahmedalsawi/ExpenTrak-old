import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";

import { AlertFlash } from "components";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// bootswatch theme cosmo
import "assets/css/bootstrap.min.css";

import "App.css";

storiesOf("Alert", module)
  .addDecorator(StoryRouter())
  .add("params", () => <AlertFlash message={"Incorrect password"} />);
