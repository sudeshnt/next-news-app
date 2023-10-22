import { News } from "@/services/types";

export const parseJsonSafely = (str: string | undefined): News | null => {
  if (str) {
    try {
      let jsonObject = JSON.parse(str);
      return jsonObject;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
