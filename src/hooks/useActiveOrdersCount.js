// Hook to get active orders count for a user
import { useState, useEffect } from 'react';
import firestoreDataService from '../services/firestoreDataService';

const useActiveOrdersCount = (userId) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }

    const loadCount = async () => {
      try {
        const orders = await firestoreDataService.getUserOrders(userId);
        const activeOrders = orders.filter(order => 
          order.status !== 'delivered' && order.status !== 'completed'
        );
        setCount(activeOrders.length);
      } catch (error) {
        console.error('Error loading active orders count:', error);
        setCount(0);
      }
    };

    loadCount();

    // Listen for order changes
    const unsubscribe = firestoreDataService.onOrdersChange((allOrders) => {
      const userOrders = allOrders.filter(o => o.userId === userId);
      const activeOrders = userOrders.filter(order => 
        order.status !== 'delivered' && order.status !== 'completed'
      );
      setCount(activeOrders.length);
    });

    return () => unsubscribe && unsubscribe();
  }, [userId]);

  return count;
};

export default useActiveOrdersCount;
