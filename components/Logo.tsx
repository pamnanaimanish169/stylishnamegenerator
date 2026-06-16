type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`logo-brand ${className}`.trim()}>
      <svg
        className="logo-brand__mark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width={22}
        height={22}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="logo-accent"
            x1="4"
            y1="4"
            x2="28"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff2d95" />
            <stop offset="0.5" stopColor="#c8ff00" />
            <stop offset="1" stopColor="#00e8ff" />
          </linearGradient>
          <linearGradient
            id="logo-shine"
            x1="8"
            y1="6"
            x2="24"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#faf6ef" stopOpacity="0.35" />
            <stop offset="1" stopColor="#faf6ef" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="#141210" />
        <rect
          x="1.25"
          y="1.25"
          width="29.5"
          height="29.5"
          rx="7"
          stroke="url(#logo-accent)"
          strokeWidth="1.25"
          opacity="0.85"
        />
        <rect
          x="1.25"
          y="1.25"
          width="29.5"
          height="29.5"
          rx="7"
          fill="url(#logo-shine)"
        />
        <path
          d="M21.2 9.8c0-2.6-2.2-4.3-5.2-4.3-3.4 0-5.4 1.8-5.4 4.4 0 2.1 1.3 3.4 4.4 4.2l1.4.3c3.5.8 5.2 2.2 5.2 4.8 0 2.8-2.4 4.8-6.2 4.8-3.5 0-6-1.8-6.2-4.9"
          stroke="url(#logo-accent)"
          strokeWidth="2.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24.5" cy="8" r="1.1" fill="#c8ff00" />
        <circle cx="8" cy="24" r="0.85" fill="#00e8ff" opacity="0.9" />
      </svg>
      {showWordmark ? (
        <span className="logo-mark">StylishNameGenerator.in</span>
      ) : null}
    </span>
  );
}
