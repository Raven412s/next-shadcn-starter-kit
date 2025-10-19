/** biome-ignore-all lint/a11y/noSvgWithoutTitle: explanation */

import type * as React from "react";

const Logo: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="400"
    height="400"
    fill="none"
    viewBox="0 0 400 400"
    className={props.className}
  >
    <circle cx="200" cy="200" r="200" fill="url(#paint0_radial_22_97)"></circle>
    <path
      fill="#fff"
      d="M134.92 221.5c-3.184 0-5.091-3.539-3.341-6.199l87.654-133.217c2.317-3.522 7.803-1.526 7.315 2.662l-10.528 90.291a4 4 0 0 0 3.973 4.463h55.456c3.211 0 5.113 3.591 3.31 6.247l-88.091 129.75c-2.351 3.461-7.766 1.447-7.283-2.709l10.096-86.826a4 4 0 0 0-3.973-4.462z"
    ></path>
    <defs>
      <radialGradient
        id="paint0_radial_22_97"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(36.399 -126.914 24.032)scale(413.714)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7CFDC0"></stop>
        <stop offset="0.386" stopColor="#3B785C"></stop>
        <stop offset="0.723" stopColor="#172E23"></stop>
        <stop offset="1"></stop>
      </radialGradient>
    </defs>
  </svg>
);

export default Logo;
