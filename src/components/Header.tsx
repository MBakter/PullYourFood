import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';

import "./components.less"

export function Header() {
	const { url } = useLocation();

	let [isHamburger, setIsHamburger] = useState(false);

	const toggleMenu = () => {
		setIsHamburger(!setIsHamburger);
	}

	return (
		<header>
			<nav>
				<div class={`topnav ${isHamburger ? 'responsive' : ''}`} id="topNav">
					<div class="inner-topnav">
						<a href="/" class={url == '/' && 'active'}>
							Home
						</a>
						<a href="/explore" class={url == '/explore' && 'active'}>
							Explore
						</a>
						<a href="/account" class={url == '/account' && 'active'}>
							Account
						</a>
						
						<a href="javascript:void(0);" class="icon" onClick={toggleMenu}>
							&#9776;
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}
