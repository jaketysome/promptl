export function countWords(str: string): number {
    let count = 0;
    const words = str.split(/\s+/);
    words.forEach((word) => {
      if (word !== "") {
        count++;
      }
    });
  
    return count;
  }

export function extractWords(str: string): string[] {
  if (!str) return [];

  const words = str.split(" ").filter((word) => word.length > 0);

  return words.map((word) => word.toLowerCase());
}