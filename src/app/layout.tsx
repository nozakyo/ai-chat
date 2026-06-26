import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.scss';

const notoSans = Noto_Sans({
	subsets: ['latin'],
	variable: '--font-noto-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'AIチャット',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" className={notoSans.variable}>
			<body>
				{children}
			</body>
		</html>
	);
}