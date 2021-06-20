import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	background-color: lightgrey;
`;

export const Header = styled.header`
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
  background-color: lightblue;
	padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const Content = styled.div`
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
	padding: 30px;

	h2 {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 30px;
	}
`;

export const Ficha = styled.form`
	width: 550px;
	margin: 0 auto;
	padding: 30px;

  background-color: lightblue;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		padding: 0;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 30px;

		input {
			margin-top: 5px;
			border: 1px;
			padding: 5px 10px;
			width: 500px;
			font-size: 0.95rem;
		}
	}

	button {
		margin-top: 30px;
		height: 30px;
		width: 100px;
		border: 0;
		background-color: green;
		color: white;
		font-weight: 600;
	}

	button:hover {
		filter: brightness(85%);
	}

	@media (max-width: 900px) {
		width: 100%;
		div {
			input {
				width: 15rem;
			}
		}
	}
`;

export const Data = styled.div`
	width: 400px;
	margin: 0 auto;
	padding: 40px 30px;
	background-color: lightblue;
	margin-top: 30px;

	display: flex;
	align-items: center;
	justify-content: center;

	.leftData {
		width: 50%;

		div {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			margin-top: 30px;

			label {
				font-size: 0.8rem;
			}

			span {
				margin-top: 5px;
			}
		}

		div:first-child {
			margin-top: 0;
		}
	}

	.rightData {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		button {
			height: 30px;
			width: 100px;
			border: 0;

			background-color: green;
			color: white;
			font-weight: 600;
		}

		button:last-child {
			margin-top: 30px;
			background-color: red;
		}

		button:hover {
			filter: brightness(85%);
		}
	}

	@media (max-width: 900px) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.leftData {
			padding: 0;
			margin: 0 auto;
      width: 100%;

			div {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

    .rightData {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 30px auto 0 auto;

      button {
        padding: 0 10px;
      }

      button:last-child {
        margin: 0;
        margin-left: 20px;
      }

      button:hover {
			width: 100px;
			margin-right: 0;
			filter: brightness(85%);
		}
    }
	}
`;
