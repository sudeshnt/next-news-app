import { parseJsonSafely, removeDuplicateSpaces } from "../"; // Replace 'yourFile' with the actual file name

describe("parseJsonSafely", () => {
  it("should return null when input is undefined", () => {
    expect(parseJsonSafely(undefined)).toBeNull();
  });

  it("should return null when input is not a valid JSON string", () => {
    expect(parseJsonSafely("not a json string")).toBeNull();
  });

  it("should return a parsed object when input is a valid JSON string", () => {
    const jsonString = '{"title": "Test News", "body": "This is a test news"}';
    expect(parseJsonSafely(jsonString)).toEqual({
      title: "Test News",
      body: "This is a test news",
    });
  });
});

describe("removeDuplicateSpaces", () => {
  it("removes duplicate spaces", () => {
    const input = "This  is  a  test";
    const output = "This is a test";
    expect(removeDuplicateSpaces(input)).toEqual(output);
  });

  it("removes duplicate newlines", () => {
    const input = "This\n\nis\n\na\ntest";
    const output = "This\nis\na\ntest";
    expect(removeDuplicateSpaces(input)).toEqual(output);
  });

  it("removes mixed duplicate whitespace", () => {
    const input = "This \n\n is \n a  test";
    const output = "This is a test";
    expect(removeDuplicateSpaces(input)).toEqual(output);
  });

  it("returns the original string when there are no duplicates", () => {
    const input = "This is a test";
    expect(removeDuplicateSpaces(input)).toEqual(input);
  });
});
