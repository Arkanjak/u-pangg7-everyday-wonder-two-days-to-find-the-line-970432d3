import { mkdirSync, writeFileSync } from "node:fs";

// The everyday moment, built from beats so the surprise lands last:
// the setup grounds the scene, the twist reframes it.
const BEATS = [
  "The elevator doors opened on the wrong floor,",
  "and my neighbor's cat was already waiting there",
  "like it had pressed the button itself.",
];

const ENTRY = BEATS.join(" ");

function checkEntry(text: string): void {
  // Codepoint-based length (not UTF-16 code units), so any future
  // non-ASCII beat is measured the way the gate counts characters.
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  // UTF-8 byte-length sanity check: the written file must stay small
  // and the byte count must be at least the codepoint count.
  const byteLength = new TextEncoder().encode(text).length;
  if (byteLength < length || byteLength > 200 * 4) {
    throw new Error(`entry byte length out of range: ${byteLength}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be one complete sentence");
  }
  // One sentence only: exactly one sentence-ending mark, and it must be
  // the final character -- no trailing terminator hidden mid-text.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1) {
    throw new Error(`entry must be exactly one sentence, got ${terminators.length} terminators`);
  }
  const onlyTerminatorAt = text.search(/[.!?]/);
  if (onlyTerminatorAt !== text.length - 1) {
    throw new Error("the single sentence terminator must be the last character");
  }
  // Self-check on the beats: the entry must be exactly the three beats
  // joined with single spaces, each beat non-empty, no double spaces.
  if (BEATS.length !== 3 || BEATS.some((beat) => beat.trim().length === 0)) {
    throw new Error("entry must be built from exactly three non-empty beats");
  }
  if (text.includes("  ")) {
    throw new Error("entry must not contain double spaces");
  }
}

checkEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
