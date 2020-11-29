import React from "react";
import renderer from "react-test-renderer";
import PostList from "../../PostList/PostList";
import RenderWithRouter from "../../../test_utils/renderWithRouter";

it("renders correctly with all props", () => {
  const requiredProps = {
    posts: [
      {
        id: 5,
        url: "https://www.sitkneelbend.com",
        score: 999,
        kids: [],
        by: "moopie",
        title: "Jest: a tale of misery",
        time: 2392031230,
      },
    ],
  };
  const tree = renderer
    .create(
      <>
        <RenderWithRouter>
          <PostList {...requiredProps} />
        </RenderWithRouter>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
