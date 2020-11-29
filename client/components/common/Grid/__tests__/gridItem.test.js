import React from "react";
import renderer from "react-test-renderer";
import Grid from "../Grid";
import GridItem from "../GridItem";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <>
        <Grid cols="95% 5% auto" rows="10% 80% auto">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
