import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_TOKEN });
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;
const mockText = process.env.MOCK_TEXT;

type GeminiErrorBody = {
	error?: { code?: number; status?: string };
};

function toUserMessage(e: unknown): { message: string; status: number } {
	const body = (e instanceof Error ? JSON.parse(e.message.match(/\{[\s\S]*/)?.[0] ?? '{}') : {}) as GeminiErrorBody;
	const code = body?.error?.code;
	const geminiStatus = body?.error?.status;

	if (code === 429 || geminiStatus === 'RESOURCE_EXHAUSTED') {
		return { message: 'APIの利用制限に達しました。しばらくしてからお試しください。', status: 429 };
	}
	if (code === 503 || geminiStatus === 'UNAVAILABLE') {
		return { message: 'AIが混み合っています。しばらくしてからお試しください。', status: 503 };
	}
	if (code === 401 || code === 403) {
		return { message: 'APIキーが無効です。', status: 403 };
	}
	if (code === 404) {
		return { message: 'AIモデルが見つかりません。', status: 404 };
	}
	console.error('[ask-ai]', e);
	return { message: 'エラーが発生しました。もう一度お試しください。', status: 500 };
}

export async function POST(req: NextRequest) {
	try {
		const { message } = await req.json() as { message: string };

		if (process.env.GENAI_MOCK === 'true') {
			return NextResponse.json({ reply: `（モック）「${message}」へのAI返答です。` + mockText });
		}

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash-lite",
			contents: message,
			config: { systemInstruction: SYSTEM_PROMPT },
		});
		return NextResponse.json({ reply: response.text });
	} catch (e) {
		const { message, status } = toUserMessage(e);
		return NextResponse.json({ error: message }, { status });
	}
}
