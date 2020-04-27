import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
    border-radius: 100%;
    border: 2px solid hsl(${props => props.borderColor + 260}, 50%, 50%);
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    color: #000000;
    display: inline-block;
    position: relative;
    bottom: 10px;
    font-weight: bold;
    line-height: 6em;
    margin-right: 5px;
    text-align: center;
    width: 6em; 
    font-size: 3em;
  }`;

function NumberSpan({ label, borderColor }) {
  return <Span borderColor={borderColor}>{label}</Span>;
}

export default NumberSpan;
