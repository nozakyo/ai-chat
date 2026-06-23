export type Message = {
	role: 'user' | 'assistant';
	text: string;
	isError?: boolean;
};
