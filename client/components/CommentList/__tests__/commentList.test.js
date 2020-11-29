import React from "react";
import renderer from "react-test-renderer";
import CommentList from "../CommentList";
import RenderWithRouter from "../../../test_utils/renderWithRouter";

it("renders correctly with all props", () => {
  const requiredProps = {
    comments: [
      {
        id: 5,
        by: "moopie",
        text: "Jest: a tale of misery",
        time: 231238213,
      },
    ],
  };

  const tree = renderer
    .create(
      <>
        <RenderWithRouter>
          <CommentList {...requiredProps} />
        </RenderWithRouter>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
