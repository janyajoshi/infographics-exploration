import React from "react"
import { MarkerType, Position } from "reactflow"

export const nodes = [
	{
		id: "1",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label 1",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "2",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label 2",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "3",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label 3",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "4",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label 4",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "5",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label 5",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "n",
		type: "custom",
		position: { x: 0, y: 0 },
		data: {
			label: "Some Label n",
		},
		style: {
			width: "100px",
			height: "30px",
			background: "#00000000",
			borderRadius: "4px",
		},
	},
	{
		id: "res",
		type: "output",
		data: {
			label: "Result : res",
		},
		className: "circle",
		style: {
			background: "#2B6CB0",
			color: "white",
		},
		position: { x: 700, y: 200 },
		sourcePosition: Position.Right,
		targetPosition: Position.Left,
	},
]

export const edges = [
	{
		id: "e1",
		source: "1",
		target: "2",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e2",
		source: "2",
		target: "3",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e3",
		source: "3",
		target: "4",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e4",
		source: "4",
		target: "5",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e5",
		source: "5",
		target: "n",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
	{
		id: "e6",
		source: "n",
		target: "res",
		type: "smoothstep",
		// label: "edgeLabel",
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	},
]
