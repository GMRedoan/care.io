"use client";

import styled from "styled-components";

const Button2 = ({
    children,
    onClick,
    bgColor = "#11B2ED",
    textColor = "#11B2ED",
    hoverColor = "#11B2ED",
    className = "",
}) => {
    return (
        <StyledWrapper
            $bgColor={bgColor}
            $hoverColor={hoverColor}
            $textColor={textColor}
        >
            <button onClick={onClick} className={`button2 ${className}`}>
                {children}
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .button2 {
    transition: all 0.3s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: ${(props) => props.$textColor};
    cursor: pointer;
    font-size: 14px;
    border-radius: 12px;
    border: 1px solid #11B2ED;
  }

  .button2:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: ${(props) => props.$bgColor};
    border-radius: 50%;
    display: block;
    transition: all 0.5s;
    z-index: -1;
  }

  .button2:hover {
    color: #ffffff;
    border: 1px solid ${(props) => props.$hoverColor};
  }

  .button2:hover:after {
    top: -45%;
    background-color: ${(props) => props.$hoverColor};
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;

export default Button2;
