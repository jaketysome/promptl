import { countWords } from "@/lib/utils";

describe('countWords', () => {
    it('should return 0 if passed an empty string', () => {
        const result = countWords("");

        expect(result).toEqual(0);
    });

    it('should return 1 if passed a single word', () => {
        const result = countWords("Bananas");

        expect(result).toEqual(1);
    });

    it('should correctly count multiple words', () => {
        const result1 = countWords("Big bananas");
        const result2 = countWords("I have big bananas");
        const result3 = countWords("I have big bananas that I grew in my banana tree");

        expect(result1).toEqual(2);
        expect(result2).toEqual(4);
        expect(result3).toEqual(11);
    });
});