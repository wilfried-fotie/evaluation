import { collection, getDocs } from "firebase/firestore";
import { db } from "./index"

function fetchDocuments(name) {
    return (new Promise(async(resolve, reject) => {

        const data = []



        try {

            const querySnapshot = await getDocs(collection(db, name));
            querySnapshot.forEach((doc) => {

                data.push({ id: doc.id, ...doc.data() })
            });

            resolve(data)
        } catch (e) {
            reject(["error"])
        }

    }))
}

export default fetchDocuments