import styled from "styled-components";

const Wrapper = styled.section`
	width: 100%;
	padding: 2rem 1rem;

	.dashboard {
		display: flex;
		justify-content: space-around;
		text-align: center;
	}

	.card {
		background: var(--white);
		box-shadow: var(--shadow-2);
		padding: 2rem 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--primary-900);
	}

	.card img {
		height: 150px;
		width: auto;
		margin-bottom: 2rem;
		text-align: center;
	}

	a {
		color: var(--primary-200);
	}

	@media (min-width: 992px) {
	}
	@media (min-width: 1120px) {
	}
`;

export default Wrapper;
