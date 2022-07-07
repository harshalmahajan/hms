import styled from "styled-components";

const Wrapper = styled.main`
	.main-menu {
		display: flex;
		justify-content: space-between;
		padding: 1rem 5rem;
		width: 100%;
		background: var(--backgroundColorPrimary);
	}
	nav {
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	h4 {
		font-weight: 700;
		color: var(--primary-500);
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
		display: flex;
		-ms-flex-align: center;
	}
	.left-menu {
		width: 30%;
		text-align: center;
		padding: 2rem 1rem;
	}
	.patient-container {
		width: 70%;
		justify-content: flex-end;
		padding: 0 1rem;
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
	}
	.nav-link {
		display: flex;
		align-items: center;
		color: var(--grey-100);
		padding: 0.5rem 2.5rem;
		text-transform: capitalize;
		transition: var(--transition);
	}
	.nav-link:hover {
		background: var(--grey-50);
		padding: 0.5rem 2.5rem;
		color: var(--grey-900);
	}
	.nav-link:hover .icon {
		color: var(--primary-500);
	}
	// Left menus................

	.left-nav-links {
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: var(--shadow-2);
		// margin: 1rem;
		height: 100%;
		align-items: flex-start;
	}
	.left-nav-link {
		width: 100%;
		color: var(--grey-500);
		padding: 2rem 2.5rem;
		text-transform: capitalize;
		transition: var(--transition);
		text-align: left;
	}
	.left-nav-link:hover {
		width: 100%;
		padding: 2rem 2.5rem;
		color: var(--grey-50);
		background: var(--backgroundColorPrimary);
	}

	.left-nav-link:active {
		width: 100%;
		padding: 2rem 2.5rem;
		color: var(--grey-50);
		background: var(--backgroundColorPrimary);
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
