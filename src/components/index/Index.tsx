"use client"

import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { ChatWindow } from './ChatWindow';
import { ChatForm } from './ChatForm';
import type { Message } from './types';

const initMessage: Message = {
	role: "assistant",
	text: '星座占いをします。あなたの星座を入力してください',
};

export default function Index() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const message = input.trim();
		if (!message || isLoading) return;

		setMessages(prev => [...prev, { role: 'user', text: message }]);
		setInput('');
		setIsLoading(true);

		try {
			const res = await fetch('/api', {
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

	useEffect(() => {
		setTimeout(() => {
			setMessages(prev => [...prev, initMessage]);
			setIsLoading(false);
		}, 500);
	}, [])

	return (
		<section id="ask-ai" className={styles.container}>
			<div className={styles.inner}>
				<ChatWindow
					messages={messages}
					isLoading={isLoading}
				/>
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
