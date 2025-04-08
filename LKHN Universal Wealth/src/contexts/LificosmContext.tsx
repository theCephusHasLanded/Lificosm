import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LificosmUser, 
  LificosmEvent, 
  LificosmWallet,
  LificosmBusiness,
  LificosmReceipt,
  LificosmMarketplaceItem,
  LificosmNotification
} from '../types/lificosm';

interface LificosmContextType {
  currentUser: LificosmUser | null;
  wallet: LificosmWallet | null;
  events: LificosmEvent[];
  businesses: LificosmBusiness[];
  receipts: LificosmReceipt[];
  marketplace: LificosmMarketplaceItem[];
  notifications: LificosmNotification[];
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerForEvent: (eventId: string) => Promise<boolean>;
  uploadReceipt: (receipt: Partial<LificosmReceipt>) => Promise<boolean>;
  redeemPerk: (perkId: string) => Promise<boolean>;
  createMarketplaceItem: (item: Partial<LificosmMarketplaceItem>) => Promise<boolean>;
  sendMessage: (userId: string, message: string) => Promise<boolean>;
  updateUserProfile: (updates: Partial<LificosmUser>) => Promise<boolean>;
  markNotificationAsRead: (notificationId: string) => void;
}

const LificosmContext = createContext<LificosmContextType | undefined>(undefined);

// Mock data for demonstration purposes
const mockUser: LificosmUser = {
  id: 'user1',
  name: 'Daisha Johnson',
  email: 'daisha@example.com',
  phoneNumber: '212-555-1234',
  tier: 'Prime',
  lificredits: 2750,
  joinDate: '2023-11-15',
  preferences: {
    notifications: true,
    categories: ['food', 'culture', 'education'],
    neighborhood: 'South Bronx'
  },
  savings: {
    goal: 5000,
    current: 1250,
    history: [
      {
        date: '2024-04-01',
        amount: 125,
        source: 'Grocery cashback'
      },
      {
        date: '2024-03-15',
        amount: 75,
        source: 'Local shopping'
      }
    ]
  }
};

const mockWallet: LificosmWallet = {
  userId: 'user1',
  lificredits: 2750,
  cashback: {
    total: 325,
    available: 125,
    pending: 75
  },
  perks: [
    {
      id: 'perk1',
      name: 'Free Coffee & Pastry',
      expires: '2024-04-15',
      used: false
    },
    {
      id: 'perk2',
      name: '10% Off at Bronx Grocers',
      expires: '2024-05-01',
      used: false
    }
  ],
  transactions: [
    {
      id: 'tx1',
      date: '2024-04-01',
      type: 'earn',
      amount: 250,
      source: 'Grocery receipt',
      description: 'Earned from Food Bazaar receipt'
    },
    {
      id: 'tx2',
      date: '2024-03-28',
      type: 'cashback',
      amount: 75,
      source: 'Marketplace',
      description: 'Cashback from local vendors'
    }
  ]
};

const mockEvents: LificosmEvent[] = [
  {
    id: 'event1',
    title: 'Financial Literacy Workshop',
    description: 'Learn the basics of budgeting and saving',
    date: '2024-04-15',
    time: '18:00-20:00',
    location: 'LKHN Hub - Bronx',
    category: 'education',
    pointsValue: 150,
    attendees: ['user2', 'user3'],
    organizerId: 'org1',
    capacity: 25,
    imageUrl: '/images/financial-workshop.jpg'
  },
  {
    id: 'event2',
    title: 'Community Market Day',
    description: 'Local vendors and artists showcase their work',
    date: '2024-04-22',
    time: '10:00-16:00',
    location: 'Southern Boulevard',
    category: 'community',
    pointsValue: 100,
    attendees: ['user4'],
    organizerId: 'org2',
    imageUrl: '/images/market-day.jpg'
  },
  {
    id: 'event3',
    title: 'Bronx Art Exhibition',
    description: 'Featuring local artists from the neighborhood',
    date: '2024-04-29',
    time: '12:00-18:00',
    location: 'Bronx Art Space',
    category: 'culture',
    pointsValue: 125,
    attendees: [],
    organizerId: 'org3',
    capacity: 50,
    imageUrl: '/images/art-exhibition.jpg'
  }
];

const mockBusinesses: LificosmBusiness[] = [
  {
    id: 'biz1',
    name: 'Bronx Grocers',
    description: 'Local fresh produce and groceries',
    category: 'food',
    address: '123 Southern Blvd, Bronx, NY',
    neighborhood: 'South Bronx',
    pointsRate: 10,
    cashbackRate: 0.05,
    offers: [
      {
        id: 'offer1',
        title: '10% Off Produce',
        description: 'Get 10% off all fresh produce',
        pointsCost: 500,
        validUntil: '2024-05-01'
      }
    ]
  },
  {
    id: 'biz2',
    name: 'Café Bustelo',
    description: 'Authentic Latin coffee shop',
    category: 'food',
    address: '456 Westchester Ave, Bronx, NY',
    neighborhood: 'South Bronx',
    pointsRate: 15,
    cashbackRate: 0.04,
    offers: [
      {
        id: 'offer2',
        title: 'Free Coffee',
        description: 'Redeem your weekly free coffee',
        pointsCost: 0,
        validUntil: '2024-04-15'
      }
    ]
  }
];

const mockReceipts: LificosmReceipt[] = [
  {
    id: 'receipt1',
    userId: 'user1',
    businessId: 'biz1',
    date: '2024-04-01',
    total: 85.25,
    items: [
      {
        name: 'Organic Vegetables',
        price: 25.50,
        quantity: 1,
        category: 'produce'
      },
      {
        name: 'Chicken',
        price: 12.75,
        quantity: 2,
        category: 'meat'
      },
      {
        name: 'Rice',
        price: 8.99,
        quantity: 1,
        category: 'grains'
      }
    ],
    points: 850,
    cashback: 4.26
  }
];

const mockMarketplace: LificosmMarketplaceItem[] = [
  {
    id: 'item1',
    sellerId: 'user3',
    title: 'Math Tutoring',
    description: 'One-hour math tutoring session for high school students',
    category: 'education',
    price: 25,
    pointsValue: 250,
    isExchange: false,
    imageUrl: '/images/tutoring.jpg',
    status: 'available',
    createdAt: '2024-03-25'
  },
  {
    id: 'item2',
    sellerId: 'user4',
    title: 'Handmade Jewelry',
    description: 'Locally crafted earrings and necklaces',
    category: 'art',
    price: 35,
    isExchange: false,
    imageUrl: '/images/jewelry.jpg',
    status: 'available',
    createdAt: '2024-03-29'
  }
];

const mockNotifications: LificosmNotification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    title: 'Your Weekly Perk is Ready!',
    message: 'Your free coffee and pastry perk has been refreshed. Visit Café Bustelo to redeem.',
    type: 'perk',
    read: false,
    createdAt: '2024-04-08',
    action: {
      type: 'redeem',
      target: 'perk1'
    }
  },
  {
    id: 'notif2',
    userId: 'user1',
    title: 'New Financial Workshop',
    message: 'A new financial literacy workshop has been scheduled for next week.',
    type: 'event',
    read: false,
    createdAt: '2024-04-07',
    action: {
      type: 'rsvp',
      target: 'event1'
    }
  }
];

export const LificosmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<LificosmUser | null>(mockUser);
  const [wallet, setWallet] = useState<LificosmWallet | null>(mockWallet);
  const [events, setEvents] = useState<LificosmEvent[]>(mockEvents);
  const [businesses, setBusinesses] = useState<LificosmBusiness[]>(mockBusinesses);
  const [receipts, setReceipts] = useState<LificosmReceipt[]>(mockReceipts);
  const [marketplace, setMarketplace] = useState<LificosmMarketplaceItem[]>(mockMarketplace);
  const [notifications, setNotifications] = useState<LificosmNotification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentUser(mockUser);
      setWallet(mockWallet);
      setError(null);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
    setWallet(null);
  };

  // Register for an event
  const registerForEvent = async (eventId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update events with user registered
      const updatedEvents = events.map(event => {
        if (event.id === eventId && currentUser) {
          return {
            ...event,
            attendees: [...event.attendees, currentUser.id]
          };
        }
        return event;
      });
      
      setEvents(updatedEvents);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to register for event. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload receipt
  const uploadReceipt = async (receipt: Partial<LificosmReceipt>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new receipt with a generated ID
      const newReceipt: LificosmReceipt = {
        id: `receipt${receipts.length + 1}`,
        userId: currentUser?.id || '',
        businessId: receipt.businessId || '',
        date: receipt.date || new Date().toISOString().split('T')[0],
        total: receipt.total || 0,
        items: receipt.items || [],
        points: receipt.points || 0,
        cashback: receipt.cashback
      };
      
      setReceipts([...receipts, newReceipt]);
      
      // Update wallet with earned points and cashback
      if (wallet && currentUser) {
        const updatedWallet = {
          ...wallet,
          lificredits: wallet.lificredits + (newReceipt.points || 0),
          cashback: {
            ...wallet.cashback,
            pending: wallet.cashback.pending + (newReceipt.cashback || 0)
          },
          transactions: [
            {
              id: `tx${wallet.transactions.length + 1}`,
              date: new Date().toISOString().split('T')[0],
              type: 'earn' as const,
              amount: newReceipt.points || 0,
              source: 'receipt',
              description: `Earned from ${receipt.businessId} receipt`
            },
            ...wallet.transactions
          ]
        };
        
        setWallet(updatedWallet);
      }
      
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to upload receipt. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Redeem a perk
  const redeemPerk = async (perkId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (wallet) {
        const updatedWallet = {
          ...wallet,
          perks: wallet.perks.map(perk => 
            perk.id === perkId ? { ...perk, used: true } : perk
          )
        };
        
        setWallet(updatedWallet);
      }
      
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to redeem perk. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Create marketplace item
  const createMarketplaceItem = async (item: Partial<LificosmMarketplaceItem>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem: LificosmMarketplaceItem = {
        id: `item${marketplace.length + 1}`,
        sellerId: currentUser?.id || '',
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'other',
        price: item.price,
        pointsValue: item.pointsValue,
        isExchange: item.isExchange || false,
        imageUrl: item.imageUrl,
        status: 'available',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setMarketplace([newItem, ...marketplace]);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to create marketplace item. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Send message to another user
  const sendMessage = async (userId: string, message: string): Promise<boolean> => {
    // Mock implementation - in a real app, this would store messages in a database
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Message sent to ${userId}: ${message}`);
        resolve(true);
      }, 500);
    });
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<LificosmUser>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        setCurrentUser(updatedUser);
      }
      
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <LificosmContext.Provider
      value={{
        currentUser,
        wallet,
        events,
        businesses,
        receipts,
        marketplace,
        notifications,
        isLoading,
        error,
        login,
        logout,
        registerForEvent,
        uploadReceipt,
        redeemPerk,
        createMarketplaceItem,
        sendMessage,
        updateUserProfile,
        markNotificationAsRead
      }}
    >
      {children}
    </LificosmContext.Provider>
  );
};

// Custom hook to use the Lificosm context
export const useLificosm = () => {
  const context = useContext(LificosmContext);
  if (context === undefined) {
    throw new Error('useLificosm must be used within a LificosmProvider');
  }
  return context;
};
