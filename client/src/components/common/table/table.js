const Table = ({ columns, data }) => {
	return (
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					{columns?.map((col, key) => {
						return <th key={key}>{col.title}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{data?.map((row, key) => {
					return (
						<tr key={key}>
							{columns?.map((col, key) => {
								return (
									<td key={key} className="">
										<span>
											{col.isCustomColumn
												? row[col.field + "Template"]
												: row[col.field]}
										</span>
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
