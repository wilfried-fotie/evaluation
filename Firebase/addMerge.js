import { db } from "./index"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"


export default function Add(data, spe, id) {
    return new Promise(async(resolve, reject) => {

        await setDoc(doc(db, spe, id), data, { merge: true }).then(() => resolve(true)).catch(() => reject(false));

    })
}