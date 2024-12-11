import { useLocation } from 'preact-iso';

import "./header.less"

/**
 * The header component. The account and login text changes with the isLoggedIn parameter
 * @param isLoggedIn: If the user is logged in or not.
 * @returns 
 */
export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<div class="topnav" id="topNav">
					<div class="inner-topnav">
						<a href="/" class={url == '/' && 'active'}>
							Home
						</a>
						<a href="/explore" class={url == '/explore' && 'active'}>
							Explore
						</a>
						<a href={ isLoggedIn ? "/account" : "/login"} class={url == '/account' && 'active'}>
							{isLoggedIn ? "Account" : "Login"}
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}
