export type MembershipTier = 'Free' | 'Prime' | 'Community Builder';

export interface LificosmUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  tier: MembershipTier;
  lificredits: number;
  joinDate: string;
  preferences: {
    notifications: boolean;
    categories: string[];
    neighborhood?: string;
  };
  savings: {
    goal: number;
    current: number;
    history: {
      date: string;
      amount: number;
      source: string;
    }[];
  };
}

export interface LificosmEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  pointsValue: number;
  attendees: string[];
  organizerId: string;
  capacity?: number;
  imageUrl?: string;
}

export interface LificosmReceipt {
  id: string;
  userId: string;
  businessId: string;
  date: string;
  total: number;
  items: {
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }[];
  points: number;
  cashback?: number;
}

export interface LificosmBusiness {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  neighborhood: string;
  pointsRate: number; // e.g., 10 points per dollar
  cashbackRate?: number; // e.g., 0.05 for 5%
  offers: {
    id: string;
    title: string;
    description: string;
    pointsCost?: number;
    discount?: number;
    validUntil: string;
  }[];
}

export interface LificosmMarketplaceItem {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  pointsValue?: number;
  isExchange: boolean;
  imageUrl?: string;
  status: 'available' | 'pending' | 'completed';
  createdAt: string;
}

export interface LificosmWallet {
  userId: string;
  lificredits: number;
  cashback: {
    total: number;
    available: number;
    pending: number;
  };
  perks: {
    id: string;
    name: string;
    expires?: string;
    used: boolean;
  }[];
  transactions: {
    id: string;
    date: string;
    type: 'earn' | 'redeem' | 'cashback';
    amount: number;
    source: string;
    description: string;
  }[];
}

export interface LificosmHousingLottery {
  id: string;
  name: string;
  description: string;
  address: string;
  units: number;
  pointsCost: number;
  applicationDeadline: string;
  participants: string[];
  status: 'upcoming' | 'open' | 'closed' | 'awarded';
}

export type LificosmNotification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'offer' | 'event' | 'perk' | 'system';
  read: boolean;
  createdAt: string;
  action?: {
    type: 'link' | 'redeem' | 'rsvp';
    target: string;
  };
};
