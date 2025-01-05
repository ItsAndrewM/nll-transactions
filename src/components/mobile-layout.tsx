import MobileMenu from "./mobile-menu";

export default function MobileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			<MobileMenu />
		</>
	);
}
