import React, { useState, useRef, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styled from "styled-components";
import { fadeInLeftNoOpacity } from "../../utils/keyframes/fadeAnimations";
const StyledScrollArrow = styled(FaArrowCircleUp)`
  position: fixed;
  width: 100%;
  bottom: 20px;
  height: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: opacity 0.5s;
  opacity: 0.5;
  animation: ${fadeInLeftNoOpacity} 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);
  const componentIsMounted = useRef(true);

  const checkScrollTop = () => {
    if (!showScroll && componentIsMounted.current && window.pageYOffset > 400) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if ((componentIsMounted.current = true)) {
      window.addEventListener("scroll", checkScrollTop);
    }
    return () => (componentIsMounted.current = false);
  }, []);
  return (
    <StyledScrollArrow
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? "flex" : "none" }}
    />
  );
};

export default ScrollArrow;
