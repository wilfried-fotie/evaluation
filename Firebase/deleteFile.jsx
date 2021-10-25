import { getStorage, ref, deleteObject } from "firebase/storage";



export default function deleteFile(filename) {

    return new Promise((resolve, reject) => {
        const storage = getStorage();

        // Create a reference to the file to delete
        const desertRef = ref(storage, filename);

        // Delete the file
        deleteObject(desertRef).then(() => {
resolve(true)
        }).catch((error) => {
            reject(false)

        });
   }) 







    

}