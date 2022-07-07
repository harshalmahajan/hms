const FormRow = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	showLabel,
	className,
}) => {
	return (
		<div className={`${className ? className : " "} form-row`}>
			{showLabel && (
				<label htmlFor={name} className="form-label">
					{labelText || name}
				</label>
			)}
			<input
				type={type}
				value={value}
				name={name}
				placeholder={(!showLabel && labelText) || name}
				onChange={handleChange}
				className="form-input"
			/>
		</div>
	);
};

export default FormRow;
