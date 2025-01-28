import { NavMenu } from "./nav-menu";

export default function NavLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavMenu />
			{children}
		</>
	);
}
