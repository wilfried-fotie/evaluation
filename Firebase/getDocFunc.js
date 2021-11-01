import { collection, getDocs } from "firebase/firestore";
import { db } from "./index"


function getDocFunc(name) {
    return new Promise(async() => {
        const querySnapshot = await getDocs(collection(db, "speciality"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })

}