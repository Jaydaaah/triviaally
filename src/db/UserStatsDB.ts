import {
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { Database } from "../firebaseConfig";

interface UserParameter {
    user_name?: string,
    category_name?: string,
    difficulty?: "easy" | "medium" | "hard",
    question?: string | string[]
}

function userSegment({user_name, category_name, difficulty}: UserParameter) {
    return [user_name, category_name, difficulty].filter((value) => value != undefined);
}

export async function addRightQuestion(user_params: UserParameter) {
    const {user_name, category_name, difficulty, question} = user_params;
    if (user_name && category_name && difficulty && question) {
        const docRef = doc(Database, "users", ...userSegment(user_params));
        try {
            await updateDoc(docRef, {
                items: arrayUnion(question),
            });
        } catch {
            await setDoc(docRef, { items: [] }, { merge: true });
            return addRightQuestion(user_params);
        }
    } else {
        throw new Error("addRightQuestion: Provide all required parameters");
    }
}

export async function computeScore(user_params: UserParameter) {
    const {user_name} = user_params;
    if (user_name) {
        const docRef = doc(Database, "users", ...userSegment(user_params));
        return docRef;

    } else {
        throw new Error ("computeScore: Provide user_name");
    }
}
