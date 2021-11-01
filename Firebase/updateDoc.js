import { doc, updateDoc } from "firebase/firestore";
import { db } from "./index"


function updateDocument(name, data, id) {
    return (new Promise(async(resolve, reject) => {



        // Set the "capital" field of the city 'DC'


        try {
            const washingtonRef = doc(db, name, id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, data);

            resolve(true)
        } catch (e) {
            reject(false)
        }

    }))
}

export default updateDocument