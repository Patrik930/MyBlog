import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readCategories=(setCategories)=>{
    const collectionRef = collection(db,'categories')
    const q = query(collectionRef,orderBy('name','asc'))
   const unsubscribe = onSnapshot(q,(snapshot)=>{
        setCategories(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe;
}

export const addPost = async(formData)=>{
    const collectionRef = collection(db,'posts')
    const newItem = {...formData,timestamp:serverTimestamp()}
    await addDoc(collectionRef,newItem)
}

export const readPosts=(setPosts)=>{
    const collectionRef = collection(db,'posts')
    const q = query(collectionRef,orderBy('timestamp','asc'))
   const unsubscribe = onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe;
}