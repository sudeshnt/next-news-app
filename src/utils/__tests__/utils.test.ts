import { parseJsonSafely } from "../"; // Replace 'yourFile' with the actual file name

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
