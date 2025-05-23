import {
  formatGuessWords,
  compareWords,
  countWords,
  extractWords,
  removePunctuation,
  checkWinCondition,
  updateGuessList,
} from "@/lib/utils";

describe("countWords", () => {
  it("should return 0 if passed an empty string", () => {
    const result = countWords("");

    expect(result).toEqual(0);
  });

  it("should return 1 if passed a single word", () => {
    const result = countWords("Bananas");

    expect(result).toEqual(1);
  });

  it("should correctly count multiple words", () => {
    const result1 = countWords("Big bananas");
    const result2 = countWords("I have big bananas");
    const result3 = countWords(
      "I have big bananas that I grew in my banana tree"
    );

    expect(result1).toEqual(2);
    expect(result2).toEqual(4);
    expect(result3).toEqual(11);
  });
});

describe("extractWords", () => {
  it("should return an empty array if passed an empty string", () => {
    const result = extractWords("");

    expect(result).toEqual([]);
  });

  it("should return a single word in an array", () => {
    const result = extractWords("banana");

    expect(result).toEqual(["banana"]);
  });

  it("should return multiple words in an array", () => {
    const result1 = extractWords("my banana");
    const result2 = extractWords("my banana is long");
    const result3 = extractWords("my banana is long and yellow");
    const result4 = extractWords(
      "my banana is long and yellow with some black spots"
    );

    expect(result1).toEqual(["my", "banana"]);
    expect(result2).toEqual(["my", "banana", "is", "long"]);
    expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
    expect(result4).toEqual([
      "my",
      "banana",
      "is",
      "long",
      "and",
      "yellow",
      "with",
      "some",
      "black",
      "spots",
    ]);
  });

  it("should ignore multiple spacings", () => {
    const result1 = extractWords("my    banana");
    const result2 = extractWords("my banana is   long");
    const result3 = extractWords("my banana     is long and     yellow");
    const result4 = extractWords(
      "my   banana is     long and yellow    with some black          spots     "
    );

    expect(result1).toEqual(["my", "banana"]);
    expect(result2).toEqual(["my", "banana", "is", "long"]);
    expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
    expect(result4).toEqual([
      "my",
      "banana",
      "is",
      "long",
      "and",
      "yellow",
      "with",
      "some",
      "black",
      "spots",
    ]);
  });

  it("should make all letters lower case", () => {
    const result1 = extractWords("My banana");
    const result2 = extractWords("my banana is LONG");
    const result3 = extractWords("mY bAnaNa Is loNG AND yELLow");

    expect(result1).toEqual(["my", "banana"]);
    expect(result2).toEqual(["my", "banana", "is", "long"]);
    expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
  });

  it("should remove any punctuation", () => {
    const result1 = extractWords("My banana.");
    const result2 = extractWords("my banana: is long!?");
    const result3 = extractWords('"my banana is long, and yellow."');
    const result4 = extractWords(
      "!@£$%^&*(){}[]:;'|<>,.?/`~my banana is long and yellow with some black spots"
    );
    const result5 = extractWords(
      "!my @£banana is$%^ lo&*ng (and y){}[ellow wi]:th some blac;'|<>,.?/k spots`~"
    );

    expect(result1).toEqual(["my", "banana"]);
    expect(result2).toEqual(["my", "banana", "is", "long"]);
    expect(result3).toEqual(["my", "banana", "is", "long", "and", "yellow"]);
    expect(result4).toEqual([
      "my",
      "banana",
      "is",
      "long",
      "and",
      "yellow",
      "with",
      "some",
      "black",
      "spots",
    ]);
    expect(result5).toEqual([
      "my",
      "banana",
      "is",
      "long",
      "and",
      "yellow",
      "with",
      "some",
      "black",
      "spots",
    ]);
  });
});

describe("compareWords", () => {
  const promptWords = [
    "a",
    "spaceship",
    "landing",
    "on",
    "a",
    "vibrant",
    "alien",
    "planet",
  ];
  const guessWords1 = [
    "some",
    "giant",
    "bees",
    "flying",
    "with",
    "scary",
    "green",
    "butterflies",
  ];
  const guessWords2 = [
    "the",
    "purple",
    "spaceship",
    "lands",
    "on",
    "a",
    "lovely",
    "planet",
  ];

  it("should return an empty array if guessWords or promptWords is empty", () => {
    const result1 = compareWords(guessWords1, []);
    const result2 = compareWords([], promptWords);
    const result3 = compareWords([], []);

    expect(result1).toEqual([]);
    expect(result2).toEqual([]);
    expect(result3).toEqual([]);
  });

  it("should return correct status for a single matching word in the correct position", () => {
    const result = compareWords(["banana"], ["banana"]);

    expect(result[0].text).toBe("banana");
    expect(result[0].status).toBe("correct");
  });

  it("should return incorrect status for a single matching word in the correct position", () => {
    const result = compareWords(["banana"], ["apple"]);

    expect(result[0].text).toBe("banana");
    expect(result[0].status).toBe("incorrect");
  });

  it("should return partial status for matching words in the wrong position", () => {
    const result = compareWords(["a", "banana"], ["banana", "a"]);

    expect(result[0].text).toBe("a");
    expect(result[1].text).toBe("banana");
    expect(result[0].status).toBe("partial");
    expect(result[1].status).toBe("partial");
  });

  it("should return the correct staus for multiple words", () => {
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

describe("removePunctuation", () => {
  it("should return an empty string if passed an empty string", () => {
    const result = removePunctuation("");

    expect(result).toEqual("");
  });

  it("should remove all punctuation from a string", () => {
    const result1 = removePunctuation("BANANAS!@£$%^&*(){}[]:;'|<>,.?/`~");
    const result2 = removePunctuation(
      "I!@ £$%LO^&VE*(){ }[]:;BANA'|<>NAS,.?/`~"
    );
    const result3 = removePunctuation("!@A£$%P^&*(P){}[]L:;'|E<>,.?/`~S");

    expect(result1).toEqual("BANANAS");
    expect(result2).toEqual("I LOVE BANANAS");
    expect(result3).toEqual("APPLES");
  });
});

describe("formatGuessWords", () => {
  it("should return an empty string if passed an empty string", () => {
    const guessResults = [{ text: "", status: "incorrect" }];

    const result = formatGuessWords(
      guessResults[0].text,
      guessResults.length,
      0
    );

    expect(result).toBe("");
  });

  it("should capitalise a word with an index of 0", () => {
    const guessResults = [
      { text: "hello", status: "incorrect" },
      { text: "sailor", status: "incorrect" },
    ];

    const result1 = formatGuessWords(
      guessResults[0].text,
      guessResults.length,
      0
    );
    const result2 = formatGuessWords(
      guessResults[1].text,
      guessResults.length,
      1
    );

    expect(result1).toBe("Hello\u00A0");
    expect(result2).toBe("sailor");
  });

  it("should add spaces after non-ending words", () => {
    const guessResults = [
      { text: "hello", status: "incorrect" },
      { text: "sailor", status: "incorrect" },
    ];

    const result1 = formatGuessWords(
      guessResults[0].text,
      guessResults.length,
      0
    );
    const result2 = formatGuessWords(
      guessResults[1].text,
      guessResults.length,
      1
    );

    expect(result1).toBe("Hello\u00A0");
    expect(result2).toBe("sailor");
  });
});

describe("checkWinCondition", () => {
  it("should return false if passed an empty array", () => {
    const result = checkWinCondition([]);

    expect(result).toBe(false);
  });

  it("should return true if a single guess result status is correct", () => {
    const result = checkWinCondition([
      { text: "spaceship", status: "correct" },
    ]);

    expect(result).toBe(true);
  });

  it("should return true if all guess results in an array have a status of correct", () => {
    const guessResults: _GuessResult[] = [
      { text: "a", status: "correct" },
      { text: "bright", status: "correct" },
      { text: "green", status: "correct" },
      { text: "spaceship", status: "correct" },
      { text: "flying", status: "correct" },
    ];

    const result = checkWinCondition(guessResults);

    expect(result).toBe(true);
  });

  it("should return false if any guess results have a status that is not correct", () => {
    const guessResults1: _GuessResult[] = [
      { text: "a", status: "correct" },
      { text: "bright", status: "correct" },
      { text: "green", status: "correct" },
      { text: "spaceship", status: "correct" },
      { text: "flying", status: "incorrect" },
    ];

    const guessResults2: _GuessResult[] = [
      { text: "a", status: "correct" },
      { text: "bright", status: "incorrect" },
      { text: "green", status: "partial" },
      { text: "spaceship", status: "correct" },
      { text: "flying", status: "incorrect" },
    ];

    const result1 = checkWinCondition(guessResults1);
    const result2 = checkWinCondition(guessResults2);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});

describe("updateGuessList", () => {
  it("should return an empty array if passed an empty array", () => {
    const result = updateGuessList(0, "", []);

    expect(result).toEqual([]);
  });

  it("should add the current guess to the next guess in the list", () => {
    const initialGuessList = [
      { id: 6 },
      { id: 5 },
      { id: 4 },
      { id: 3 },
      { id: 2 },
      { id: 1 },
    ];

    let guessCount = 0;

    // guess 1
    const updatedList1 = updateGuessList(
      guessCount,
      "A brown dog",
      initialGuessList
    );
    guessCount++;

    expect(updatedList1[5].id).toBe(1);
    expect(updatedList1[5].body).toBe("A brown dog");

    // guess 2
    const updatedList2 = updateGuessList(
      guessCount,
      "A brown dog jumping",
      updatedList1
    );
    guessCount++;

    expect(updatedList2[5].id).toBe(1);
    expect(updatedList2[5].body).toBe("A brown dog");
    expect(updatedList2[4].id).toBe(2);
    expect(updatedList2[4].body).toBe("A brown dog jumping");

    // guess 3
    const updatedList3 = updateGuessList(
      guessCount,
      "A brown dog jumping high",
      updatedList2
    );
    guessCount++;

    expect(updatedList3[5].id).toBe(1);
    expect(updatedList3[5].body).toBe("A brown dog");
    expect(updatedList3[4].id).toBe(2);
    expect(updatedList3[4].body).toBe("A brown dog jumping");
    expect(updatedList3[3].id).toBe(3);
    expect(updatedList3[3].body).toBe("A brown dog jumping high");
  });

  it("should not mutate the original guessList array", () => {
    const guessList = [
      { id: 6 },
      { id: 5 },
      { id: 4 },
      { id: 3 },
      { id: 2 },
      { id: 1 },
    ];

    updateGuessList(0, "A purple skink", guessList);

    expect(guessList).toEqual([
      { id: 6 },
      { id: 5 },
      { id: 4 },
      { id: 3 },
      { id: 2 },
      { id: 1 },
    ]);
  });
});
