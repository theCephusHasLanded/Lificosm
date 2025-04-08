import React from 'react';
import { Building, Coffee } from 'lucide-react';
import Card from '../components/common/Card';

const HubPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#6E56CF' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LKHN HUB</h2>
            <p className="text-white text-sm mt-1">Physical spaces for community, creation, and financial education</p>
          </div>
        </div>
      </div>

      <Card>
        <div className="flex items-center mb-3">
          <Building size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">PHYSICAL LOCATIONS</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Minimalist-designed environments where knowledge, creativity, and capital converge.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Austin, TX</div>
            <div className="text-xs text-green-400 mt-1">ACTIVE</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Houston, TX</div>
            <div className="text-xs text-green-400 mt-1">ACTIVE</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center mb-3">
          <Coffee size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">CREATOR SPACES</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Dedicated environments for collaboration, innovation, and community building.
        </p>
        <div className="h-32 bg-gray-900 rounded-sm flex items-center justify-center mb-2">
          <div className="text-xs uppercase tracking-wider text-gray-500">HUB VISUALIZATION</div>
        </div>
        <div className="text-xs text-center text-gray-400">
          Minimalist black and white design with focus on functionality and community
        </div>
      </Card>
    </div>
  );
};

export default HubPage;
