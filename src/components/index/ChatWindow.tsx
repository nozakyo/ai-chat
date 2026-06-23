import styles from './styles.module.scss';
import type { Message } from './types';

type Props = {
	messages: Message[];
	isLoading: boolean;
};

export function ChatWindow({ messages, isLoading }: Props) {
	return (
		<div className={styles.chatWindow}>
			{messages.map((msg, i) => (
				<div key={i} className={`${styles.message} ${styles[msg.role]} ${msg.isError ? styles.error : ''}`}>
					{msg.text}
				</div>
			))}
			{isLoading && (
				<div className={`${styles.message} ${styles.assistant} ${styles.loading}`}>
					<span />
					<span />
					<span />
				</div>
			)}
		</div>
	);
}
