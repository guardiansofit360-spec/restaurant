// Firestore service module with CRUD operations
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Initialize Firestore (already initialized in firebase.js)
 * This function is provided for API consistency
 */
export const init = () => {
  console.log('Firestore initialized');
  return db;
};

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {object} data - Document data
 * @returns {Promise<string>} - Document ID
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log('Document added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Array>} - Array of documents with id
 */
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Store original id as originalId if it exists, then use Firestore doc ID as id
      documents.push({ 
        ...data, 
        ...(data.id !== undefined && { originalId: data.id }),
        id: doc.id 
      });
    });
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @returns {Promise<object|null>} - Document data with id or null
 */
export const getDocById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Store original id as originalId if it exists, then use Firestore doc ID as id
      return { 
        ...data, 
        ...(data.id !== undefined && { originalId: data.id }),
        id: docSnap.id 
      };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

/**
 * Update a document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @param {object} data - Updated data
 * @returns {Promise<void>}
 */
export const updateDocById = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log('Document updated:', id);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

/**
 * Set a document by ID (creates if doesn't exist, updates if exists)
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @param {object} data - Document data
 * @returns {Promise<void>}
 */
export const setDocById = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log('Document set:', id);
  } catch (error) {
    console.error('Error setting document:', error);
    throw error;
  }
};

/**
 * Delete a document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} id - Document ID
 * @returns {Promise<void>}
 */
export const deleteDocById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document deleted:', id);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Listen to real-time updates on a collection
 * @param {string} collectionName - Name of the collection
 * @param {function} onUpdate - Callback function receiving updated documents array
 * @returns {function} - Unsubscribe function
 */
export const onCollectionSnapshot = (collectionName, onUpdate) => {
  const collectionRef = collection(db, collectionName);
  
  const unsubscribe = onSnapshot(
    collectionRef,
    (snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Store original id as originalId if it exists, then use Firestore doc ID as id
        documents.push({ 
          ...data, 
          ...(data.id !== undefined && { originalId: data.id }),
          id: doc.id 
        });
      });
      onUpdate(documents);
    },
    (error) => {
      console.error('Error listening to collection:', error);
    }
  );
  
  return unsubscribe;
};
