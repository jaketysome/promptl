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