"use client"

import { useState } from "react";
import styles from './styles.module.scss';
import { ChatWindow } from './ChatWindow';
import { ChatForm } from './ChatForm';
import type { Message } from './types';

export default function Index() {
	const [messages, setMessages] = useState<Message[]>([{
		role: "assistant",
		text: '星座占いをします。あなたの星座を入力してください',
	}]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const message = input.trim();
		if (!message || isLoading) return;

		setMessages(prev => [...prev, { role: 'user', text: message }]);
		setInput('');
		setIsLoading(true);

		try {
			const res = await fetch('/api/ask-ai', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message }),
			});
			const data = await res.json() as { reply?: string; error?: string };
			if (!res.ok || data.error) {
				setMessages(prev => [...prev, { role: 'assistant', text: data.error ?? 'エラーが発生しました。', isError: true }]);
			} else {
				setMessages(prev => [...prev, { role: 'assistant', text: data.reply ?? '' }]);
			}
		} catch {
			setMessages(prev => [...prev, { role: 'assistant', text: 'ネットワークエラーが発生しました。', isError: true }]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section id="ask-ai" className={styles.container}>
			<div className={styles.inner}>
				<ChatWindow messages={messages} isLoading={isLoading} />
				<ChatForm
					input={input}
					isLoading={isLoading}
					onChange={setInput}
					onSubmit={handleSubmit}
				/>
			</div>
		</section>
	);
}
