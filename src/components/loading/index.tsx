"use client";

import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }

  ul li {
    list-style: none;
    color: black;
    font-size: 3rem;
    letter-spacing: 16px;
    animation: animate 3s linear infinite;
  }

  ul li:nth-child(1) {
    animation-delay: 0.3s;
  }

  ul li:nth-child(2) {
    animation-delay: 0.6s;
  }

  ul li:nth-child(3) {
    animation-delay: 0.9s;
  }

  ul li:nth-child(4) {
    animation-delay: 1.2s;
  }

  ul li:nth-child(5) {
    animation-delay: 1.5s;
  }

  ul li:nth-child(6) {
    animation-delay: 1.8s;
  }

  ul li:nth-child(7) {
    animation-delay: 2.1s;
  }

  ul li:nth-child(8) {
    animation-delay: 2.4s;
  }

  ul li:nth-child(9) {
    animation-delay: 2.7s;
  }

  ul li:nth-child(10) {
    animation-delay: 3s;
  }

  @keyframes animate {
    0% {
      color: #0284c7;
      text-shadow: 0 0 7px #0284c7, 0 0 50px #ff6c00;
    }

    90% {
      color: #0284c7;
    }

    100% {
      color: black;
    }
  }
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <ul>
        {["L", "O", "A", "D", "I", "N", "G", ".", ".", "."].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </LoadingContainer>
  );
}
