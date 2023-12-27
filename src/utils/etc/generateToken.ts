/**
 * The function generates a random 16 char token.
 * @returns a randomly generated token.
 */
export default function generateToken() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}
