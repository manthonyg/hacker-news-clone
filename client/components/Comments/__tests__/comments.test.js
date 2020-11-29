import React from "react";
import renderer from "react-test-renderer";
import Comment from "../Comment";
import RenderWithRouter from "../../../test_utils/renderWithRouter";

it("renders correctly with all props", () => {
  const requiredProps = {
    comment: {
      id: 5,
      by: "moopie",
      text: "Jest: a tale of misery",
      time: 231238213,
    },
  };
  const tree = renderer
    .create(
      <>
        <RenderWithRouter>
          <Comment {...requiredProps} />
        </RenderWithRouter>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
