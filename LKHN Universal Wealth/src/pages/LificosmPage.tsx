import React, { useState } from 'react';
import { useLificosm } from '../contexts/LificosmContext';
import Card from '../components/common/Card';
import { useTranslation } from '../contexts/TranslationContext';
import { Calendar, CreditCard, Landmark, ShoppingBag, Users, Receipt, Info } from 'lucide-react';

const LificosmPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, wallet, events, businesses, marketplace, notifications } = useLificosm();
  const [activeTab, setActiveTab] = useState<'home' | 'wallet' | 'events' | 'marketplace'>('home');

  if (!currentUser || !wallet) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Lificosm</h2>
        <p>Please log in to access Lificosm services.</p>
        {/* Login form would go here */}
      </div>
    );
  }

  const renderHomeTab = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">{currentUser.name}</h3>
            <p className="text-xs text-gray-400">{currentUser.tier} Member</p>
          </div>
          <div className="bg-gray-800 px-3 py-1 rounded-full flex items-center">
            <span className="text-xs font-medium mr-1">{wallet.lificredits}</span>
            <span className="text-xs text-gray-400">Credits</span>
          </div>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-sm mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Savings Goal</span>
            <span className="text-xs">${currentUser.savings.current} / ${currentUser.savings.goal}</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(currentUser.savings.current / currentUser.savings.goal) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Your Perks</h4>
          
          {wallet.perks.map(perk => (
            <div key={perk.id} className="flex justify-between items-center p-3 bg-gray-900 rounded-sm">
              <div>
                <p className="text-sm">{perk.name}</p>
                {perk.expires && <p className="text-xs text-gray-500">Expires: {perk.expires}</p>}
              </div>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${perk.used ? 'bg-gray-800 text-gray-500' : 'bg-green-900 text-green-400'}`}
                disabled={perk.used}
              >
                {perk.used ? 'Used' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
      </Card>
      
      <div>
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Upcoming Events</h4>
        <div className="space-y-2">
          {events.slice(0, 2).map(event => (
            <Card key={event.id} className="p-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-400">{event.date} • {event.time}</p>
                  <p className="text-xs text-gray-400">{event.location}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-full mb-2">+{event.pointsValue} pts</span>
                  <button className="text-xs text-blue-400">RSVP</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Local Businesses</h4>
        <div className="space-y-2">
          {businesses.map(business => (
            <Card key={business.id} className="p-3">
              <div>
                <p className="text-sm font-medium">{business.name}</p>
                <p className="text-xs text-gray-400">{business.address}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">{business.pointsRate}x Points</span>
                  {business.cashbackRate && (
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                      {business.cashbackRate * 100}% Cashback
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWalletTab = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-sm uppercase tracking-wider mb-4">Your Wallet</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-900 p-3 rounded-sm">
            <p className="text-xs text-gray-400">Lificredits</p>
            <p className="text-xl font-medium">{wallet.lificredits}</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-sm">
            <p className="text-xs text-gray-400">Cashback</p>
            <p className="text-xl font-medium">${wallet.cashback.available.toFixed(2)}</p>
            {wallet.cashback.pending > 0 && (
              <p className="text-xs text-gray-500">
                ${wallet.cashback.pending.toFixed(2)} pending
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button className="flex-1 bg-gray-800 text-white text-sm py-2 rounded-sm">Add Receipt</button>
          <button className="flex-1 bg-gray-800 text-white text-sm py-2 rounded-sm">Transfer Points</button>
        </div>
      </Card>
      
      <div>
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Transaction History</h4>
        <Card>
          <div className="space-y-4">
            {wallet.transactions.map(transaction => (
              <div key={transaction.id} className="flex justify-between pb-3 border-b border-gray-800">
                <div>
                  <p className="text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <div className={`text-sm ${transaction.type === 'earn' ? 'text-green-400' : 'text-gray-400'}`}>
                  {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                  {transaction.type === 'cashback' && ' USD'}
                  {transaction.type === 'earn' && ' pts'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-wider">Community Events</h3>
        <select className="bg-gray-800 text-xs text-white p-1 rounded-sm border border-gray-700">
          <option>All Categories</option>
          <option>Education</option>
          <option>Culture</option>
          <option>Community</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {events.map(event => (
          <Card key={event.id}>
            <div className="mb-3">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">+{event.pointsValue} pts</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{event.date} • {event.time}</p>
              <p className="text-xs text-gray-400">{event.location}</p>
            </div>
            
            <p className="text-xs text-gray-300 mb-3">{event.description}</p>
            
            <div className="flex justify-between">
              <div className="flex items-center">
                <Users size={14} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-400">
                  {event.attendees.length}{event.capacity ? `/${event.capacity}` : ''} attending
                </span>
              </div>
              <button className="text-xs text-blue-400 uppercase tracking-wider">
                {event.attendees.includes(currentUser.id) ? 'Registered' : 'RSVP'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMarketplaceTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-wider">Community Marketplace</h3>
        <button className="bg-gray-800 text-xs text-white px-3 py-1 rounded-sm">
          + New Listing
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {marketplace.map(item => (
          <Card key={item.id}>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase">{item.category}</span>
              {item.isExchange ? (
                <span className="text-xs bg-purple-900 text-purple-400 px-2 py-0.5 rounded-full">Exchange</span>
              ) : (
                <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full">For Sale</span>
              )}
            </div>
            
            <h4 className="text-sm font-medium mb-1">{item.title}</h4>
            <p className="text-xs text-gray-300 mb-3">{item.description}</p>
            
            <div className="flex justify-between items-center">
              <div>
                {item.price && (
                  <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                )}
                {item.pointsValue && (
                  <span className="text-sm font-medium ml-2">{item.pointsValue} pts</span>
                )}
              </div>
              <button className="text-xs bg-gray-800 px-3 py-1 rounded-sm">
                Contact Seller
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'wallet': return renderWalletTab();
      case 'events': return renderEventsTab();
      case 'marketplace': return renderMarketplaceTab();
      default: return renderHomeTab();
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-2 h-12 mr-3 bg-yellow-600"></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LIFICOSM</h2>
            <p className="text-white text-sm mt-1">Community-powered membership platform</p>
          </div>
        </div>
      </div>

      {renderContent()}
      
      <div className="fixed bottom-16 left-0 right-0 bg-black border-t border-gray-900">
        <div className="flex justify-around max-w-lg mx-auto">
          <button 
            className={`p-3 flex flex-col items-center ${activeTab === 'home' ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('home')}
          >
            <Info size={18} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            className={`p-3 flex flex-col items-center ${activeTab === 'wallet' ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('wallet')}
          >
            <CreditCard size={18} />
            <span className="text-xs mt-1">Wallet</span>
          </button>
          
          <button 
            className={`p-3 flex flex-col items-center ${activeTab === 'events' ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={18} />
            <span className="text-xs mt-1">Events</span>
          </button>
          
          <button 
            className={`p-3 flex flex-col items-center ${activeTab === 'marketplace' ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('marketplace')}
          >
            <ShoppingBag size={18} />
            <span className="text-xs mt-1">Market</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LificosmPage;