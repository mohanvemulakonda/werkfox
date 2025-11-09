export default function LivatoLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(100, 100)">
        {/* Red curve */}
        <path
          d="M -60 -10 Q -50 -30, -30 -40 Q -10 -50, 10 -50 Q 30 -50, 45 -40"
          stroke="#E53935"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Orange curve */}
        <path
          d="M -55 0 Q -45 -15, -25 -25 Q -5 -35, 15 -35 Q 35 -35, 50 -25"
          stroke="#FB8C00"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Yellow curve */}
        <path
          d="M -50 10 Q -40 0, -20 -10 Q 0 -20, 20 -20 Q 40 -20, 55 -10"
          stroke="#FDD835"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Green curve */}
        <path
          d="M -45 20 Q -35 15, -15 5 Q 5 -5, 25 -5 Q 45 -5, 60 5"
          stroke="#7CB342"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Teal/Cyan curve */}
        <path
          d="M -40 30 Q -30 30, -10 20 Q 10 10, 30 10 Q 50 10, 65 20"
          stroke="#00ACC1"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blue curve */}
        <path
          d="M -35 40 Q -25 45, -5 35 Q 15 25, 35 25 Q 55 25, 70 35"
          stroke="#1E88E5"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Purple curve */}
        <path
          d="M -30 50 Q -20 60, 0 50 Q 20 40, 40 40 Q 60 40, 75 50"
          stroke="#8E24AA"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Magenta curve */}
        <path
          d="M -25 60 Q -15 75, 5 65 Q 25 55, 45 55 Q 65 55, 80 65"
          stroke="#D81B60"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Center black circle */}
        <circle cx="0" cy="0" r="25" fill="#1a1a1a" />

        {/* White dot in center */}
        <circle cx="-8" cy="-5" r="5" fill="white" />

        {/* Small white highlight */}
        <circle cx="8" cy="8" r="2" fill="white" opacity="0.6" />
      </g>
    </svg>
  );
}
