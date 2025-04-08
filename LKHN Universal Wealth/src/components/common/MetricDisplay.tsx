import React from 'react';

interface MetricDisplayProps {
  label: string;
  value: string;
  className?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  className = '',
}) => {
  return (
    <div className={`bg-gray-900 p-3 rounded-sm ${className}`}>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-base font-medium mt-1">{value}</div>
    </div>
  );
};

export default MetricDisplay;
