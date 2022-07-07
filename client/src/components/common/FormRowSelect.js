const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<div>
				<select
					name={name}
					value={value}
					onChange={handleChange}
					className="form-select"
				>
					{list.map((itemValue, index) => {
						return (
							<option key={index} value={itemValue.id}>
								{itemValue.name}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default FormRowSelect;
