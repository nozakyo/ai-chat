import styles from './styles.module.scss';

type Props = {
	input: string;
	isLoading: boolean;
	onChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
};

export function ChatForm({ input, isLoading, onChange, onSubmit }: Props) {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				id="input"
				value={input}
				onChange={e => onChange(e.target.value)}
				placeholder="メッセージを入力..."
				disabled={isLoading}
			/>
			<button
				className={styles.button}
				type="submit"
				disabled={isLoading || !input.trim()}
				aria-label="送信"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
					<path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
				</svg>
			</button>
		</form>
	);
}
