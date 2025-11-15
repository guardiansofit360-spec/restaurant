// React hook for real-time collection listening
import { useState, useEffect } from 'react';
import { onCollectionSnapshot } from '../lib/firestoreService';

/**
 * Custom hook to listen to a Firestore collection in real-time
 * @param {string} collectionName - Name of the collection to listen to
 * @returns {object} - { items, loading, error }
 */
const useCollection = (collectionName) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Subscribe to collection updates
    const unsubscribe = onCollectionSnapshot(
      collectionName,
      (documents) => {
        setItems(documents);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName]);

  return { items, loading, error };
};

export default useCollection;
