import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    QueryFieldFilterConstraint,
} from "firebase/firestore";
import { Database } from "../firebaseConfig";
import { Profiles } from "../context/UserAccount/Profiles";

export async function addDbScore(
    name: string,
    {
        category,
        difficulty,
        score,
    }: {
        category: string;
        difficulty: string;
        score: number;
    }
) {
    const timestamp = Date.now();
    const colRef = collection(Database, "Trivia-Scores");
    try {
        await addDoc(colRef, {
            timestamp,
            category,
            difficulty,
            name,
            score,
        });
    } catch (error) {
        console.error("Error updating score: ", error);
    }
}

interface filter {
    name?: string;
    category?: string;
    difficulty?: string;
}

const filler = Profiles.map(({ name }) => {
    return {
        timestamp: 0,
        category: "",
        difficulty: "easy",
        name,
        score: 0,
    };
});

export async function getDbScores({ name, category, difficulty }: filter) {
    const constraints: QueryFieldFilterConstraint[] = [];
    if (name) {
        constraints.push(where("name", "==", name));
    } 

    if (category) {
        constraints.push(where("category", "==", category));
    }

    if (difficulty) {
        constraints.push(where("difficulty", "==", difficulty));
    }

    const docRef = collection(Database, "Trivia-Scores");
    const queryRef = query(docRef, ...constraints);

    try {
        const docSnapshots = await getDocs(queryRef);
        const docs = docSnapshots.docs.map((snapshot) => {
            const timestamp = parseInt(snapshot.get("timestamp"));
            const category = snapshot.get("category") as string;
            const difficulty = snapshot.get("difficulty") as
                | "easy"
                | "medium"
                | "hard";
            const name = snapshot.get("name") as string;
            const score = parseInt(snapshot.get("score"));

            return {
                timestamp,
                category,
                difficulty,
                name,
                score,
            };
        });
        return [...docs, ...filler];
    } catch (error) {
        console.error(error);
    }
}
