import { useEffect, useRef } from "react";
import styles from './styles.module.scss';
import type { Message } from './types';

type Props = {
	messages: Message[];
	isLoading: boolean;
};

export function ChatWindow({ messages, isLoading }: Props) {
	const scrollRef = useRef<HTMLDivElement>(null!);
	const lastRef = useRef<HTMLDivElement>(null!);
	const lastUserIndex = messages.reduce((acc, m, i) => m.role === 'user' ? i : acc, -1);

	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: lastRef.current?.offsetTop - 50,
			behavior: "smooth",
		});
	}, [messages])

	return (
		<div className={styles.chatWindow} ref={scrollRef}>
			{messages.map((msg, i) => (
				<div
					key={i}
					className={`${styles.message} ${styles[msg.role]} ${msg.isError ? styles.error : ''}`}
					ref={i === lastUserIndex ? lastRef : null}
				>
					{msg.text}
				</div>
			))}
			{isLoading && (
				<div className={`${styles.message} ${styles.assistant} ${styles.loading}`}>
					<span /><span /><span />
				</div>
			)}
		</div>
	);
}
