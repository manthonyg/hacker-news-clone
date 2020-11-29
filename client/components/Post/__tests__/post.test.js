import React from "react";
import renderer from "react-test-renderer";
import Post from "../Post";
import RenderWithRouter from "../../../test_utils/renderWithRouter";

it("renders correctly with all props", () => {
  const requiredProps = {
    post: {
      id: 5,
      url: "https://www.sitkneelbend.com",
      score: 999,
      kids: [],
      by: "moopie",
      title: "Jest: A tale of misery",
      time: 2323029323392,
    },
    animationOrder: 100,
  };
  const tree = renderer
    .create(
      <>
        <RenderWithRouter>
          <Post {...requiredProps} />
        </RenderWithRouter>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
