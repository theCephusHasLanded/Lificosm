import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface PlatformCardProps {
  name: string;
  description: string;
  color: string;
  metrics: Metric[];
  onClick?: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  name,
  description,
  color,
  metrics,
  onClick,
}) => {
  return (
    <div 
      className="bg-black p-5 rounded-sm border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: color }}></div>
          <div>
            <div className="text-sm uppercase tracking-wider">{name}</div>
            <div className="text-xs text-gray-400 mt-1">{description}</div>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-500" />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-800">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-400">{metric.label}</div>
            <div className="text-sm font-medium mt-1">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformCard;
