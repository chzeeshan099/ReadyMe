import { delay } from "@/shared/utils/helpers";

export async function sendStudyPrompt(input, courseTitle) {
  await delay(450);

  const topic = courseTitle || "your subject";

  return `For ${topic}, start with a 25-minute focused session, list the 3 key concepts behind "${input}", and finish with one timed practice question plus a short recap in your own words.`;
}
