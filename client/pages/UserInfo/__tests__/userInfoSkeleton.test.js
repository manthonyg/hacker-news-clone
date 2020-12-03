import React from "react";
import renderer from "react-test-renderer";
import UserInfoSkeleton from "../UserInfoSkeleton";

it("renders correctly with all props", () => {
  const requiredProps = { numberOfSkeletons: 10 };
  const tree = renderer
    .create(
      <>
        <UserInfoSkeleton numberOfSkeletons={requiredProps.numberOfSkeletons} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
