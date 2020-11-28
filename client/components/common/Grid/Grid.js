import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.cols};
  grid-template-rows: ${(props) => props.rows};
`;

export default Grid;
