import Nav from "./Nav";

export const NavBar = () => {
	const navRoutes = ["home", "about", "contact"];
	return (
		<header>
			<Nav navRoutes={navRoutes} />
		</header>
	);
};
