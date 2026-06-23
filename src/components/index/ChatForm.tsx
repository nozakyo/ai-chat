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
				value={input}
				onChange={e => onChange(e.target.value)}
				placeholder="メッセージを入力..."
				disabled={isLoading}
			/>
			<button
				className={styles.button}
				type="submit"
				disabled={isLoading || !input.trim()}
			>
				送信
			</button>
		</form>
	);
}
