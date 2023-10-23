import { News } from "@/services/types";

/**
 * Safely parses a JSON string.
 *
 * @param {string | undefined} jsonString - The JSON string to parse.
 * @returns {News | null} The parsed object if the parsing was successful, null otherwise.
 */
export const parseJsonSafely = (
  jsonString: string | undefined
): News | null => {
  if (jsonString) {
    try {
      let jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
