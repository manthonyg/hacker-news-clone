import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: ${(props) => props.cols};
  grid-template-rows: ${(props) => props.rows};
`;

export default Grid;
