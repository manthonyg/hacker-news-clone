import React from "react";
import renderer from "react-test-renderer";
import Posts from "../../Posts/Posts";

it("renders correctly with all props", () => {
  const requiredProps = {
    type: "new",
  };

  const tree = renderer
    .create(
      <>
        <Posts {...requiredProps} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
