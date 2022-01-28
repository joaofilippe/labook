import { v4 } from "uuid";

export default function generateId(): string {
    return v4();
  }