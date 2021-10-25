import { app } from "./index"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function uploadAll(name, file, container) {
    return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, container + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {

                // progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;



                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {

                switch (error.code) {
                    case 'storage/unauthorized':
                        alert("vous n'êtes pas autoriser")
                        reject(true)
                        break;
                    case 'storage/canceled':
                        alert("l'import à bien été annuler")
                        reject(true)

                        break;



                    case 'storage/unknown':
                        reject(true)

                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    resolve(downloadURL)

                });
            }
        );

    })

}