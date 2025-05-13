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

  return words.map((word) => removePunctuation(word.toLowerCase()));
}

export function removePunctuation(str: string) {
  return str.split('').filter(char => {
      return /[a-zA-Z0-9 ]/.test(char);
  }).join('');
}