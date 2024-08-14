// Import necessary functions and modules from Firebase and other sources.
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Database } from "../firebaseConfig";
import { Categories } from "../api/OpenTrivia/OpenTrivia.info.json";

/**
 * Adds a new entry to the "LastPlay" collection in the Firestore database.
 *
 * @param {Object} params - The parameters for the new entry.
 * @param {string} params.name - The name associated with the entry.
 * @param {string} params.category - The category associated with the entry.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function addLastPlay(params: { name: string; category: string }) {
    // Get the current timestamp in milliseconds.
    const timestamp = Date.now();

    // Reference to the "LastPlay" collection in Firestore.
    const colRef = collection(Database, "LastPlay");

    try {
        // Add a new document to the "LastPlay" collection with the provided parameters and timestamp.
        await addDoc(colRef, {
            ...params,
            timestamp,
        });
    } catch (error) {
        // Log any errors that occur during the addition of the document.
        console.error(error);
    }
}

/**
 * Retrieves the unique categories from the "LastPlay" collection for a specific name.
 * If there are fewer unique categories than maxCount, additional categories are added from a predefined list.
 *
 * @param {string} name - The name to filter documents by.
 * @param {number} [maxCount=20] - The maximum number of unique categories to return. Default is 20.
 * @returns {Promise<string[]>} - A promise that resolves to an array of unique category names.
 */
export async function getLastPlay(name: string, maxCount: number = 6) {
    // Reference to the "LastPlay" collection in Firestore.
    const colRef = collection(Database, "LastPlay");

    // Create a query to find documents where the "name" field matches the provided name.
    const queryRef = query(colRef, where("name", "==", name));

    try {
        // Execute the query and get the resulting documents.
        const lastPlaySnapshots = await getDocs(queryRef);
        if (!lastPlaySnapshots.empty) {
            // Extract the "category" field from each document and ensure uniqueness.
            let categories = lastPlaySnapshots.docs.map((snapshot) => {
                const category: string = snapshot.get("category");
                return category;
            });
            categories = categories.filter(
                (value, index) => index === categories.indexOf(value)
            );
            // Calculate the number of additional categories needed.
            const diffLength = maxCount - categories.length;
            if (diffLength > 0) {
                // Get additional categories from the predefined list, excluding those already present.
                const fillerCategory = Categories.map((value) => value.name)
                    .filter((value) => !categories.includes(value))
                    .slice(0, diffLength);

                // Return the combined list of unique categories and additional categories.
                return [...categories, ...fillerCategory];
            } else {
                // Return the unique categories, truncated to the maximum count.
                return categories.slice(0, maxCount);
            }
        }
    } catch (error) {
        // Log any errors that occur during the retrieval of documents.
        console.error(error);
    }

    // Return an empty array if no documents are found or an error occurs.
    return Categories.map((value) => value.name)
    .slice(0, maxCount);
}
