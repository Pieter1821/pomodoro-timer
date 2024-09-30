import React from 'react';

interface ProgressCircleProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 40,
  strokeWidth = 4,
  color = '#0070f3'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={size} width={size} className="transform -rotate-90">
      <circle
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize={size / 4}
        fill={color}
        className="transform rotate-90"
      >
        {`${Math.round(progress)}%`}
      </text>
    </svg>
  );
};

export default ProgressCircle;