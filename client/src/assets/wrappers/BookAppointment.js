import styled from "styled-components";

const Wrapper = styled.section`
	align-items: center;
	.form {
	}
	.row .form-row {
		display: flex;
		justify-content: space-between;
	}

	.form-row div,
	.form-row input {
		width: 70%;
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
`;
export default Wrapper;
