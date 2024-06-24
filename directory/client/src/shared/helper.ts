export function extractUsername(url: string): string {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];

    return lastPart.startsWith('@') ? lastPart.slice(1) : lastPart;
}
