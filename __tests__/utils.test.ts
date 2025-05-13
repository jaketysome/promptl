import { countWords, extractWords, removePunctuation } from "@/lib/utils";

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