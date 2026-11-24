import { mkdirSync, writeFileSync } from "node:fs";

// The everyday moment, split into setup and twist so the surprise lands last.
const SETUP =
  "The elevator doors opened on the wrong floor, and my neighbor's cat was already waiting there";
const PUNCHLINE = "like it had pressed the button itself.";

const ENTRY = `${SETUP} ${PUNCHLINE}`;

function checkEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be one complete sentence");
  }
}

checkEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
