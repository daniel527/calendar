import React from "react";
import GroupPlaque from "./GroupPlaque";
import { Button } from "react-bootstrap";

export default function GroupList(props) {
	const [checked, setChecked] = React.useState(
		Array.from(props.groupInstances)
	);

	const handleChange = (index) => {
		console.log(checked[index]);
		let nc = Array.from(checked);
		nc[index].checked = !nc[index].checked;
		console.log(nc[index]);
		setChecked(nc);
		props.toParentHandler(nc);
	};

	const handleAddGroupClick = () => {
		const name = prompt("Enter group name: ");

		if (name) {
			let newChecked = Array.from(props.groupInstances);
			newChecked.push({id: newChecked.length, name: name, status: 'a', selected: false, checked: true, color:"#ff0000"})
			props.addNewGroup(newChecked);
			setChecked(newChecked);
		}
	};

	const handleNewColor = (group, color) => {
		let temp = Array.from(props.groupInstances);
		temp[group.id].color = color
		props.handleChangeColor(temp, group.name, color);
	}

	// console.log(props.groupInstances)

	return (
		<div
			style={{
				overflow: "auto",
				height: `Calc(100vh - 48px)`,
				width: "auto",
				backgroundColor: "#C71F28",
			}}
		>
			<div style={{padding: "5px"}}>
				{checked.map((groupInstance, index) => {
					return (
						<GroupPlaque
							key={index}
							groupInstance={groupInstance}
							onChange={() => handleChange(index)}
							checked={checked[index]}
							handleChangeColor={handleNewColor}
						/>
					);
				})}
			</div>
			<div style={{ padding: "5px" }}>
				<Button
					style={{ width: "100%" }}
					className="btn btn-light"
					onClick={() => {
						handleAddGroupClick();
					}}
				>
					Create Group
				</Button>
			</div>
		</div>
	);
}
