import styled from "styled-components";

const GridItem = styled.div`
  display: grid;
  grid-column-start: ${(props) => props.col};
  grid-row-start: ${(props) => props.row};
`;

export default GridItem;
