interface NavProps {
	navRoutes: string[];
}

const Nav: React.FC<NavProps> = ({ navRoutes }) => {
	return (
		<header>
			<nav className="bg-blue-500 p-4">
				<ul className="flex space-x-4">
					{navRoutes.map((route) => (
						<li key={route}>
							<a href={`/${route}`} className="text-white hover:text-gray-200">
								{route}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
