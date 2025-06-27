import words from "lodash.words";

export function timeToRead(content: string) {
  const avgWPM = 240;
  const wordCount = words(content).length;
  const TTR = Math.round(wordCount / avgWPM);

  if (TTR === 0) {
    return 1;
  }

  return TTR;
}
