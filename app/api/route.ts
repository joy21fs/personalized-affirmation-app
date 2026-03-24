import { generateText } from "ai";
export async function POST(req: Request) {
  try {
    const { mood, context } = await req.json();
    if (!mood || !context) {
      return Response.json(
        { error: "Missing mood or context" },
        { status: 400 }
      );
    }

    const prompt = `
You are a calm, emotionally intelligent assistant that writes short, personalized affirmations.

User state:
- Mood: ${mood}
- Context: ${context}

Instructions:
- Write 1 affirmation (max 2 sentences)
- Warm, grounding, supportive tone (like a gentle mentor)
- Make it personal and specific
- Do NOT give advice
- Avoid generic phrases and quotes

Output:
Just the affirmation text.
`;

    const result = await generateText({
      model: "openai/gpt-5-mini",
      prompt,
    });

    return Response.json({ affirmation: result.text });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}