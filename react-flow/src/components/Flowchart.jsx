import React, { useCallback } from "react"
import ReactFlow, {
	addEdge,
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
} from "reactflow"

import BackgroundImage from "../backgrounds/boeing-air-brush-747_d_wallpaper.jpg"
import { nodes as initialNodes, edges as initialEdges } from "./custom-elements"
import CustomNode from "./CustomNode"
import "reactflow/dist/style.css"
import "../styles/flowchart-styles.css"
import CustomNodeOverride from "./CustomNodeOverride"
import { addPositionToNodes } from "./positionFinder"

const nodeTypes = {
	custom: CustomNodeOverride,
}

const minimapStyle = {
	height: 120,
}

const onInit = (reactFlowInstance) => console.log("flow loaded:", reactFlowInstance)

const Flowchart = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(
		addPositionToNodes(initialNodes, 1000, 500, 100, 30)
	)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

	// we are using a bit of a shortcut here to adjust the edge type
	// this could also be done with a custom edge for example
	// const edgesWithUpdatedTypes = edges.map((edge) => {
	// 	if (edge.sourceHandle) {
	// 		const edgeType = nodes.find((node) => node.type === "custom").data.selects[edge.sourceHandle]
	// 		edge.type = edgeType
	// 	}

	// 	return edge
	// })

	const layout = {
		type: "dagre", // Choose a layout algorithm (e.g., dagre, force, etc.)
		rankdir: "TB", // Direction of the layout (Top to Bottom)
		nodeDimensionsIncludeLabels: true, // Include node labels in layout calculations
	}
	return (
		<div style={{ width: 1000, height: 500 }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={onInit}
				// fitView
				attributionPosition='top-right'
				nodeTypes={nodeTypes}
				minZoom={1}
				maxZoom={1}
				nodesDraggable={false}
				nodesConnectable={false}
				nodesFocusable={false}
				edgesFocusable={false}
				elementsSelectable={false}
				autoPanOnConnect={false}
				panOnDrag={false}
				layout={layout}
				style={{
					backgroundImage: `url(${BackgroundImage})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}>
				{/* <MiniMap style={minimapStyle} zoomable pannable /> */}
				{/* <Controls /> */}
				{/* <Background color='#aaa' gap={16} /> */}
			</ReactFlow>
		</div>
	)
}

export default Flowchart
