import React from "react";
import styled from "styled-components";

function FullPageSpinner() {
  return (
    <Wrapper>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: grey;
  width: 100vw;
  height: 100vh;

  .spinner-border {
    position: fixed;
    top: 50%;
    left: 50%;
  }
`;

export default FullPageSpinner;
