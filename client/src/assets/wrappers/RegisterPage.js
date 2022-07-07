import styled from "styled-components";

const Wrapper = styled.section`
	align-items: center;
	.form {
	}
	.row {
		display: flex;
		justify-content: space-evenly;
	}
	.inline {
		display: flex;
	}
	h4 {
		font-weight: 700;
		color: var(--primary-500);
		text-align: center;
	}

	p {
		margin: 0;
		margin-top: 1rem;
		text-align: center;
	}
	.btn {
		margin-top: 1rem;
	}
	.member-btn {
		background: transparent;
		border: transparent;
		color: var(--primary-500);
		cursor: pointer;
		letter-spacing: var(--letterSpacing);
	}
`;
export default Wrapper;
