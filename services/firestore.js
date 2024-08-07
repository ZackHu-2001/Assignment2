import { collection, addDoc, getDocs, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup'; // Ensure you import your Firestore setup

export const addActivity = async (activity) => {
    try {
        const docRef = await addDoc(collection(db, 'activities'), activity);
        return docRef.id;
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const getActivities = async () => {
    const querySnapshot = await getDocs(collection(db, 'activities'));
    const activities = [];
    querySnapshot.forEach((doc) => {
        activities.push({ id: doc.id, ...doc.data() });
    });
    return activities;
};

export const getActivity = async (id) => {
    const docRef = doc(db, 'activities', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data());
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log('No such document!');
        return null;
    }
};

export const updateActivity = async (id, updatedData) => {
    const activityRef = doc(db, 'activities', id);
    await updateDoc(activityRef, updatedData);
};

export const deleteActivity = async (id) => {
    await deleteDoc(doc(db, 'activities', id));
};

export const addDiet = async (diet) => {
    try {
        const docRef = await addDoc(collection(db, 'diets'), diet);
        return docRef.id;
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
}

export const getDiets = async () => {
    const querySnapshot = await getDocs(collection(db, 'diets'));
    const diets = [];
    querySnapshot.forEach((doc) => {
        diets.push({ id: doc.id, ...doc.data() });
    });
    return diets;
}

export const getDiet = async (id) => {
    const docRef = doc(db, 'diets', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log('No such document!');
        return null;
    }
}

export const updateDiet = async (id, updatedData) => {
    const dietRef = doc(db, 'diets', id);
    await updateDoc(dietRef, updatedData);
}

export const deleteDiet = async (id) => {
    await deleteDoc(doc(db, 'diets', id));
};
