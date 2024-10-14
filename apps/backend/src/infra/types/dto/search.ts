import { DTO } from ".";

export interface SearchDTO extends DTO {
  searchString?: string;
  limit?: number;
}
