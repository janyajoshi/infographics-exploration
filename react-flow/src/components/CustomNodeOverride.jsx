import React, { memo } from "react"
import { Handle, Position } from "reactflow"
import icon from "../icons/icon_digital_twin.png"

function CustomNodeOverride({ id, data }) {
	return (
		<>
			{/* <Handle
				type='target'
				position={Position.Left}
				style={{ top: 15, left: -8, background: "#555" }}
				onConnect={(params) => console.log("handle onConnect", params)}
			/> */}
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					background: "#aeff0080",
					color: "white",
					borderRadius: "4px",
					position: "absolute",
				}}>
				<div style={{ padding: "8px" }}>
					<img src={icon} width={40} height={40} />
					<br />
					<span>{data.label}</span>
				</div>
			</div>
			{/* <Handle
				type='source'
				position={Position.Right}
				id='a'
				style={{ top: 15, right: -8, background: "#555" }}
			/> */}
		</>
	)
}

export default memo(CustomNodeOverride)
