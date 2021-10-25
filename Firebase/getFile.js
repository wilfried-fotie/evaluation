import { getStorage, ref, getDownloadURL } from "firebase/storage";


export default function getFile(info, container = null) {

    return new Promise((resolve, reject) => {
        // Create a root reference
        const storage = getStorage();

        // Create a reference to 'images/mountains.jpg'
        const mountainImagesRef = ref(storage, container + "/" + info);

        getDownloadURL(mountainImagesRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL)

        }).catch(() => reject(null));
        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name; // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath; // false


    })



}