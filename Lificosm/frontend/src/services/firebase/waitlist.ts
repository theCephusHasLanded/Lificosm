// Firebase Waitlist Service
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { firestore } from './config';

// Define waitlist entry type
export interface WaitlistEntry {
  name: string;
  email: string;
  interest: 'viewer' | 'creator' | 'both';
  referredBy?: string;
  createdAt: Timestamp;
  referralCode?: string;
  status: 'pending' | 'approved' | 'invited';
}

/**
 * Add a new entry to the waitlist
 */
export const addToWaitlist = async (entry: Omit<WaitlistEntry, 'createdAt' | 'referralCode' | 'status'>): Promise<string> => {
  try {
    // Check if email already exists
    const emailExists = await checkEmailExists(entry.email);
    if (emailExists) {
      throw new Error('This email is already on the waitlist');
    }

    // Generate a unique referral code
    const referralCode = generateReferralCode(entry.name);
    
    // Create the waitlist entry
    const waitlistRef = collection(firestore, 'waitlist');
    const docRef = await addDoc(waitlistRef, {
      ...entry,
      createdAt: Timestamp.now(),
      referralCode,
      status: 'pending'
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw error;
  }
};

/**
 * Check if an email already exists in the waitlist
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const waitlistRef = collection(firestore, 'waitlist');
    const q = query(waitlistRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if email exists:', error);
    throw error;
  }
};

/**
 * Approve a waitlist entry
 */
export const approveWaitlistEntry = async (entryId: string): Promise<void> => {
  try {
    // Implementation would update the status of an entry to 'approved'
    // This would typically be done from an admin panel
    console.log(`Approving waitlist entry ${entryId}`);
  } catch (error) {
    console.error('Error approving waitlist entry:', error);
    throw error;
  }
};

/**
 * Record a referral
 */
export const recordReferral = async (referralCode: string, newEntryId: string): Promise<void> => {
  try {
    // Implementation would update the referrer's entry with a record of the referral
    // This would be used to track referral counts
    console.log(`Recording referral from ${referralCode} for entry ${newEntryId}`);
  } catch (error) {
    console.error('Error recording referral:', error);
    throw error;
  }
};

/**
 * Generate a unique referral code
 */
const generateReferralCode = (name: string): string => {
  // Extract first part of name (first name)
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Create a code with the first name and random characters
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `${firstName}-${randomChars}`;
};

/**
 * Get waitlist position
 */
export const getWaitlistPosition = async (email: string): Promise<number> => {
  try {
    // Implementation would query for all entries and sort by creation time
    // Return the position of the given email
    // This is a simplified implementation that would need to be improved for scalability
    console.log(`Getting waitlist position for ${email}`);
    return Math.floor(Math.random() * 100) + 1; // Dummy implementation
  } catch (error) {
    console.error('Error getting waitlist position:', error);
    throw error;
  }
};