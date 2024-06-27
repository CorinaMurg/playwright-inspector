export default function areTimestampsInDescendingOrder(timestamps: (number | string)[]): boolean {
    for (let i = 1; i < timestamps.length; i++) {
        if (timestamps[i] > timestamps[i - 1]) {
            return false; 
        }
    }
    return true; 
}
