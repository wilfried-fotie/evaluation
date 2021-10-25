import { db } from "./index"
import { collection, addDoc } from "firebase/firestore"


export default function Add(data) {
    return new Promise(async(resolve, reject) => {
        const users = collection(db, "users");
        await addDoc(users, data).then(() => resolve(true)).catch(() => reject(false))
    })
}