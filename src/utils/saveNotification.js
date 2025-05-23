import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../context/Firebase.jsx" ;
/**
 * Save a notification to Firestore
 * @param {Object} options
 * @param {string} options.message - Notification message
 * @param {string} options.fromRole - Sender's role (e.g., "admin", "renter")
 * @param {string[]} options.toRoles - Target roles (e.g., ["renter", "buyer"])
 * @param {string} [options.type] - Notification type (e.g., "new_car")
 */

export const saveNotification = async ({
    message,
    fromRole,
    toRoles,      
    type = "general",
    
}) => {
    try {
        await addDoc(collection(db, "notifications"), {
            message,
            fromRole,
            toRoles,
            type,
            readBy: [] ,
            createdAt: serverTimestamp(),
            date : new Date().toDateString()

        
        });
    } catch (error) {
        console.error("Error saving notification:", error);
    }
};