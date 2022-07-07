import styled from "styled-components";

const Wrapper = styled.main`
	.main-menu {
		display: flex;
		justify-content: space-between;
		padding: 1rem 5rem;
	}
	nav {
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	h4 {
		font-weight: 700;
		color: var(--primary-50);
	}
	h5 {
		font-weight: 500;
		color: var(--primary-100);
	}
	a {
		color: var(--primary-100);
	}
	.page {
		width: 100%;
		min-height: calc(100vh - var(--nav-height));
		display: flex;
		align-items: center;
	}
	.main-banner {
		width: 29%;
		text-align: center;
	}
	.auth-container {
		width: 70%;
		justify-content: flex-end;
		padding: 0 5rem;
		min-height: 50vh;
		background: var(--grey-50);
		border-radius: 4rem 0rem 0rem 4rem;
	}
	.sub-menu {
		height: var(--sub-nav-height);
		display: flex;
		justify-content: flex-end;
	}
	.nav-links {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: var(--backgroundColorPrimary);
	}
	.nav-link {
		display: flex;
		align-items: center;
		color: var(--grey-100);
		padding: 0.5rem 2.5rem;
		text-transform: capitalize;
		transition: var(--transition);
	}
	.nav-link.active {
		background: var(--backgroundColor);
		color: var(--grey-900);
	}
	.nav-link:hover {
		background: var(--grey-50);
		padding: 0.5rem 2.5rem;
		color: var(--grey-900);
	}
	.nav-link:hover .icon {
		color: var(--primary-500);
	}

	@media (max-width: 750px) {
		.main-banner {
			display: none;
		}
		.auth-container {
			width: 100%;
		}
	}
`;
export default Wrapper;
