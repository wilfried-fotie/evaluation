import { db } from "./index"
import { doc, deleteDoc } from "firebase/firestore";

function deleteDocument(name, id) {
    return (new Promise(async(resolve, reject) => {



        // Set the "capital" field of the city 'DC'


        try {
            await deleteDoc(doc(db, name, id.toString()));

            resolve(true)
        } catch (e) {
            reject(false)
        }

    }))
}

export default deleteDocument