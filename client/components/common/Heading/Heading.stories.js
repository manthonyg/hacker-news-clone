import React from "react";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import Heading from "./Heading";

export default {
  title: "Heading",
  decorators: [withKnobs],
};

const options = ["h1", "h2", "h3", "h4", "h5"];
const defaultValue = "h1";
export const buttonWithKnobs = () => (
  <Heading {...select("Mode", options, defaultValue)}>Example Heading!</Heading>
);
//TODO get to work with select dropdown
