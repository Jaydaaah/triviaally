import {
    collection,
    getDocs,
} from "firebase/firestore";
import { Database } from "../firebaseConfig";

export async function getUserList() {
    const docRef = collection(Database, "Players");

    try {
        return (await getDocs(docRef)).docs.map((snapshot) => {
            const name: string = snapshot.get("name");
            const src: string = snapshot.get("src");
            return {
                name,
                src
            }
        })
    } catch (error) {
        console.error(error);
    }
}
