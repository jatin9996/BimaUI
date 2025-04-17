export const LineChartCircle = ({ color }: { color?: [string, string] }) => {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="26.6665"
        cy="26"
        rx="26"
        ry="26"
        transform="rotate(90 26.6665 26)"
        fill="url(#paint0_radial_150_2669)"
      />
      <path
        d="M36 35H19C18.4477 35 18 34.5523 18 34V17H20V33H36V35ZM23.373 30L22 28.656L26.856 23.9C27.2383 23.5285 27.8467 23.5285 28.229 23.9L30.456 26.081L34.627 22L36 23.344L31.144 28.1C30.7617 28.4715 30.1533 28.4715 29.771 28.1L27.543 25.918L23.374 30H23.373Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_150_2669"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18.456 9.57895) rotate(38.2338) scale(14.3725 22.5417)"
        >
          <stop stopColor={color?.[0] || "#FFBEAA"} />
          <stop offset="1" stopColor={color?.[1] || "#F74A17"} />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const BigDot = ({ color }: { color?: string }) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="12" height="12" rx="6" fill={color || "#F74A17"} />
    </svg>
  );
};
