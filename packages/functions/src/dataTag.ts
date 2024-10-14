import { DataTag } from "@td/types";

export const getTags = (tags: DataTag[] | undefined) => {
  return tags?.length ? tags.map((x) => x.value).join(", ") : undefined;
};
