import { compareWords, countWords, extractWords, removePunctuation } from "@/lib/utils";

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

describe('extractWords', () => {
    it('should return an empty array if passed an empty string', () => {
        const result = extractWords("");

        expect(result).toEqual([]);
    });

    it('should return a single word in an array', () => {
        const result = extractWords("banana");

        expect(result).toEqual(["banana"]);
    });

    it('should return multiple words in an array', () => {
        const result1 = extractWords("my banana");
        const result2 = extractWords("my banana is long");
        const result3 = extractWords("my banana is long and yellow");
        const result4 = extractWords("my banana is long and yellow with some black spots");

        expect(result1).toEqual(["my", "banana"]);
        expect(result2).toEqual(["my", "banana", "is", "long"]);
        expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
        expect(result4).toEqual(["my", "banana", "is", "long", "and", "yellow", "with", "some", "black", "spots"]);
    });

    it('should ignore multiple spacings', () => {
        const result1 = extractWords("my    banana");
        const result2 = extractWords("my banana is   long");
        const result3 = extractWords("my banana     is long and     yellow");
        const result4 = extractWords("my   banana is     long and yellow    with some black          spots     ");

        expect(result1).toEqual(["my", "banana"]);
        expect(result2).toEqual(["my", "banana", "is", "long"]);
        expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
        expect(result4).toEqual(["my", "banana", "is", "long", "and", "yellow", "with", "some", "black", "spots"]);
    });

    it('should make all letters lower case', () => {
        const result1 = extractWords("My banana");
        const result2 = extractWords("my banana is LONG");
        const result3 = extractWords("mY bAnaNa Is loNG AND yELLow");

        expect(result1).toEqual(["my", "banana"]);
        expect(result2).toEqual(["my", "banana", "is", "long"]);
        expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
    });

    it('should remove any punctuation', () => {
        const result1 = extractWords("My banana.");
        const result2 = extractWords("my banana: is long!?");
        const result3 = extractWords('"my banana is long, and yellow."');
        const result4 = extractWords("!@£$%^&*(){}[]:;'|<>,.?/`~my banana is long and yellow with some black spots");
        const result5 = extractWords("!my @£banana is$%^ lo&*ng (and y){}[ellow wi]:th some blac;'|<>,.?/k spots`~");

        expect(result1).toEqual(["my", "banana"]);
        expect(result2).toEqual(["my", "banana", "is", "long"]);
        expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
        expect(result4).toEqual(["my", "banana", "is", "long", "and", "yellow", "with", "some", "black", "spots"]);
        expect(result5).toEqual(["my", "banana", "is", "long", "and", "yellow", "with", "some", "black", "spots"]);
    });
});

describe('removePunctuation', () => {
    it('should return an empty string if passed an empty string', () => {
        const result = removePunctuation("");

        expect(result).toEqual("");
    });

    it('should remove all punctuation from a string', () => {
        const result1 = removePunctuation("BANANAS!@£$%^&*(){}[]:;'|<>,.?/`~");
        const result2 = removePunctuation("I!@ £$%LO^&VE*(){ }[]:;BANA'|<>NAS,.?/`~");
        const result3 = removePunctuation("!@A£$%P^&*(P){}[]L:;'|E<>,.?/`~S");

        expect(result1).toEqual("BANANAS");
        expect(result2).toEqual("I LOVE BANANAS");
        expect(result3).toEqual("APPLES");
    });
});

describe('compareWords', () => {
    const promptWords = ["a", "spaceship", "landing", "on", "a", "vibrant", "alien", "planet"];
    const guessWords1 = ["some", "giant", "bees", "flying", "with", "scary", "green", "butterflies"];
    const guessWords2 = ["the", "purple", "spaceship", "lands", "on", "a", "lovely", "planet"];

    it('should return an empty array if guessWords or promptWords is empty', () => {
        const result1 = compareWords(guessWords1, []);
        const result2 = compareWords([], promptWords);
        const result3 = compareWords([], []);

        expect(result1).toEqual([]);
        expect(result2).toEqual([]);
        expect(result3).toEqual([]);
    });

    it('should return correct status for a single matching word in the correct position', () => {
        const result = compareWords(["banana"], ["banana"]);

        expect(result[0].text).toBe("banana");
        expect(result[0].status).toBe("correct");
    });

    it('should return incorrect status for a single matching word in the correct position', () => {
        const result = compareWords(["banana"], ["apple"]);

        expect(result[0].text).toBe("banana");
        expect(result[0].status).toBe("incorrect");
    });

    it('should return partial status for matching words in the wrong position', () => {
        const result = compareWords(["a", "banana"], ["banana", "a"]);

        expect(result[0].text).toBe("a");
        expect(result[1].text).toBe("banana");
        expect(result[0].status).toBe("partial");
        expect(result[1].status).toBe("partial");
    });

    it('should return the correct staus for multiple words', () => {
        const result1 = compareWords(guessWords1, promptWords);
        const result2 = compareWords(guessWords2, promptWords);

        expect(result1).toHaveLength(8);
        expect(result1[0].text).toBe("some");
        expect(result1[0].status).toBe("incorrect");
        expect(result1[4].text).toBe("with");
        expect(result1[4].status).toBe("incorrect");
        expect(result1[7].text).toBe("butterflies");
        expect(result1[7].status).toBe("incorrect");

        expect(result2).toHaveLength(8);
        expect(result2[0].text).toBe("the");
        expect(result2[0].status).toBe("incorrect");
        expect(result2[2].text).toBe("spaceship");
        expect(result2[2].status).toBe("partial");
        expect(result2[3].text).toBe("lands");
        expect(result2[3].status).toBe("incorrect");
        expect(result2[4].text).toBe("on");
        expect(result2[4].status).toBe("partial");
        expect(result2[7].text).toBe("planet");
        expect(result2[7].status).toBe("correct");
    });
});