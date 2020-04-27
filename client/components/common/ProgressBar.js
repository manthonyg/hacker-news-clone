import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  height: 60;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 5%;
  margin: 50px;
`;

const FillStyles = styled.div`
  height: 100%;
  width: ${props => props.completed || 0}%;
  background-color: hsl(${props => props.completed + 100 || 1}, 100%, 75%);
  border-radius: inherit;
  text-align: right;
`;

const SpanStyles = styled.span`
  padding: 5;
  color: white;
  font-weight: bold;
`;

function ProgressBar({ completed, label }) {
  return (
    <ProgressContainer>
      <FillStyles completed={completed}>
        <SpanStyles>{`${label}: ${completed}%`}</SpanStyles>
      </FillStyles>
    </ProgressContainer>
  );
}

export default ProgressBar;
