import React from "react";
import renderer from "react-test-renderer";
import UserInfo from "../UserInfo";

it("renders correctly with required props", () => {
  const requiredProps = {};
  const tree = renderer
    .create(
      <>
        <UserInfo {...requiredProps} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
