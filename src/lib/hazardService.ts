import { collection, addDoc, onSnapshot, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Hazard, HazardReport } from '@/types/hazard';

const HAZARDS_COLLECTION = 'hazards';

export const reportHazard = async (hazardData: HazardReport): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, HAZARDS_COLLECTION), {
      ...hazardData,
      reportedAt: Timestamp.now(),
      isActive: true,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error reporting hazard:', error);
    throw error;
  }
};

export const subscribeToHazards = (
  callback: (hazards: Hazard[]) => void,
  bounds?: { north: number; south: number; east: number; west: number }
) => {
  let q = query(
    collection(db, HAZARDS_COLLECTION),
    where('isActive', '==', true),
    orderBy('reportedAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const hazards: Hazard[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      reportedAt: doc.data().reportedAt.toDate(),
    })) as Hazard[];

    // Filter by bounds if provided
    const filteredHazards = bounds 
      ? hazards.filter(hazard => 
          hazard.location.lat >= bounds.south &&
          hazard.location.lat <= bounds.north &&
          hazard.location.lng >= bounds.west &&
          hazard.location.lng <= bounds.east
        )
      : hazards;

    callback(filteredHazards);
  });
};

export const getHazardStats = async () => {
  // This would typically use aggregation queries
  // For now, we'll return mock data that matches the UI
  return {
    activeHazards: 12,
    reportsToday: 47,
    activeCommunity: 2450,
    averageResponseTime: '3.2'
  };
};