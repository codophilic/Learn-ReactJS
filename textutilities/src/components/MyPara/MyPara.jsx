
import React from "react";
import styled from "styled-components";

// Styled component using props
// Parent styled div
const DivStyle = styled.div`
  background-color: rgb(139, 19, 214);
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  // Nested styling - target all <p> inside this div
  p {
    margin-bottom: 10px;
  }

  // Media query: smaller padding on small screens
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

// Styled paragraph
const ParaStyle = styled.p`
  color: rgb(246, 242, 242);
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.3s ease;

  // Pseudo-selector: Hover effect
  &:hover {
    color: yellow;
    font-weight: bold;
    cursor: pointer;
  }

  // Pseudo-selector: First paragraph
  &:first-child {
    text-decoration: underline;
  }

  // Media query: Larger font size on big screens
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;


const Wrapper = styled.div`
  padding: 20px;

  h1 {
    color: purple;
  }

  #custom-id {
    background: yellow;
  }

  .nested-class {
    border: 1px solid red;
  }
`;


export default function MyPara() {
    const [changeOnOver , setChangeOnOver] = React.useState(false);
    return (
        <>
        <DivStyle >
            <ParaStyle isImportant={changeOnOver} onMouseOver={()=>setChangeOnOver(true)} onMouseLeave={()=>setChangeOnOver(false)}>This is Paragraphy</ParaStyle>
            <ParaStyle isImportant>This is another Paragraphy</ParaStyle>
        </DivStyle>
        <Wrapper>
        <h1>Hello</h1>
        <p id="custom-id">ID styled</p>
        <div className="nested-class">Class styled</div>
        </Wrapper>
        </>
    );
}