import { Providers } from './providers';
import '../index.css';
export const metadata = {
	title: 'ZkMochi Rescue Website',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const globalStyles: React.CSSProperties = {
		margin: 0,
		padding: 0,
		fontFamily: 'sans-serif',
		fontSize: '16px',
		// color: '#ffffff',
		lineHeight: '1',
		// backgroundColor: '#000000',
	};

	return (
		<html lang="en">
			<link
				rel="icon"
				href="/logo.jpg"
				type="image/jpg"
				sizes="32x32"
			/>

			<body style={globalStyles}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
