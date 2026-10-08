import React from 'react';

interface ClinicLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  className = '',
  size = 44,
  showText = false,
  textColor = '#0E2866'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Circular CMGC Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 select-none drop-shadow-2xs"
        aria-label="Logo Clinique Médicale Le Grand Centre"
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="98" fill="#FFFFFF" />

        {/* Outer circular blue ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="#163E93"
          strokeWidth="3.2"
        />

        {/* Curved Text Paths */}
        <defs>
          {/* Top text arc: from left to right across the top */}
          <path
            id="cmgc-top-arc"
            d="M 22 100 A 78 78 0 0 1 178 100"
            fill="none"
          />
          {/* Bottom text arc: from left to right along the bottom */}
          <path
            id="cmgc-bottom-arc"
            d="M 178 100 A 78 78 0 0 1 22 100"
            fill="none"
          />
        </defs>

        {/* Top Text: CLINIQUE MEDICALE */}
        <text
          fill="#163E93"
          fontSize="14.5"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          letterSpacing="2.8"
        >
          <textPath href="#cmgc-top-arc" startOffset="50%" textAnchor="middle">
            CLINIQUE MEDICALE
          </textPath>
        </text>

        {/* Bottom Text: LE GRAND CENTRE */}
        <text
          fill="#163E93"
          fontSize="15"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          letterSpacing="2.6"
        >
          <textPath href="#cmgc-bottom-arc" startOffset="50%" textAnchor="middle">
            LE GRAND CENTRE
          </textPath>
        </text>

        {/* Octagon Outer Outline */}
        <polygon
          points="80,44 120,44 156,80 156,120 120,156 80,156 44,120 44,80"
          fill="#FFFFFF"
          stroke="#163E93"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Cross Solid Blue Shape */}
        <path
          d="
            M 80,44 
            L 120,44 
            L 120,80 
            L 156,80 
            L 156,120 
            L 120,120 
            L 120,156 
            L 80,156 
            L 80,120 
            L 44,120 
            L 44,80 
            L 80,80 
            Z
          "
          fill="#163E93"
        />

        {/* White Letters & Symbol Inside the Cross */}
        {/* Top Arm: C */}
        <text
          x="100"
          y="72"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="900"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          C
        </text>

        {/* Left Arm: M */}
        <text
          x="62"
          y="100"
          fill="#FFFFFF"
          fontSize="21"
          fontWeight="900"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          M
        </text>

        {/* Center White Plus Sign */}
        <path
          d="M 97,97 v -8 h 6 v 8 h 8 v 6 h -8 v 8 h -6 v -8 h -8 v -6 h 8 Z"
          fill="#FFFFFF"
        />

        {/* Right Arm: G (italic/stylized as in logo) */}
        <text
          x="138"
          y="100"
          fill="#FFFFFF"
          fontSize="23"
          fontWeight="900"
          fontStyle="italic"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          G
        </text>

        {/* Bottom Arm: C */}
        <text
          x="100"
          y="138"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="900"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          C
        </text>
      </svg>

      {/* Optional Side Text Branding */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#163E93]">
            Clinique Médicale
          </span>
          <span
            className="text-lg font-black tracking-tight leading-none"
            style={{ color: textColor }}
          >
            Le Grand Centre
          </span>
        </div>
      )}
    </div>
  );
};
