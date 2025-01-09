import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
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

export const readPosts=(setPosts,selCateg)=>{
    const collectionRef = collection(db,'posts')
    const q=selCateg.length == 0 ?
     query(collectionRef,orderBy('timestamp','asc'))
     :
     query(collectionRef,where('category','in',selCateg))
   const unsubscribe = onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe;
}

export const ReadPost=async(id,setPost)=>{
    const docRef = doc(db,'posts',id)
    //const docSnap = await getDoc(docRef)
    const unsubscribe = onSnapshot(docRef,(snapshot)=>{
        setPost({...snapshot.data(),id:snapshot.id})
        return unsubscribe
    })

    
    // setPost({...docSnap.data(),id:docSnap.id})

}

export const deletePost=async (id)=>{
    const docRef = doc(db,'posts',id)
    await deleteDoc(docRef)
}

export const toggleLike=async(uid,id)=>{
    const docRef = doc(db,'posts',id)
    const docSnap = await getDoc(docRef)
    const likesArr = docSnap.data().likes || []
    if(likesArr.includes(uid)){
        console.log('unlike');
        await updateDoc(docRef,{likes:likesArr.filter(p_id=>p_id!=uid)})
        
    }else{
        console.log('Like');
        await updateDoc(docRef,{likes:[...likesArr,uid]})
    }

}
export const readLikes = async(id,setLikesNr)=>{
    const docRef = doc(db,'posts',id)
    const docSnap = await getDoc(docRef)
    setLikesNr(docSnap.data().likes.length)
}