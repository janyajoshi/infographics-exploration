function generateNodePositions(areaWidth, areaHeight, nodeSize, numNodes) {
	const positions = []
	const innerBoundary = 20 // 20-pixel inner boundary

	// Calculate the usable width and height within the inner boundary
	const usableWidth = areaWidth - 2 * innerBoundary
	const usableHeight = areaHeight - 2 * innerBoundary

	// Calculate the number of rows and columns to distribute nodes evenly within the usable space
	const numCols = Math.floor(
		Math.sqrt((usableWidth * usableHeight) / (nodeSize.width * nodeSize.height * numNodes))
	)
	const numRows = Math.ceil(numNodes / numCols)

	// Calculate the actual width and height of a cell based on even distribution within the usable space
	const cellWidth = usableWidth / numCols
	const cellHeight = usableHeight / numRows

	// Calculate the central alignment offsets for both width and height
	const offsetX = (usableWidth - cellWidth * numCols) / 2 + innerBoundary
	const offsetY = (usableHeight - cellHeight * numRows) / 2 + innerBoundary

	// Generate positions for nodes within the usable space with central alignment
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			const x = col * cellWidth + offsetX
			const y = row * cellHeight + offsetY
			positions.push({ x, y })
		}
	}

	return positions.slice(0, numNodes) // Return only positions for the requested number of nodes
}

function calculateBrickPositions(
	numBricks,
	brickLength,
	brickBreadth,
	lawnLength,
	lawnBreadth,
	brickDistance
) {
	// Calculate the total area of bricks
	const totalBrickArea = numBricks * brickLength * brickBreadth

	// Calculate the number of rows and columns of bricks
	const numRows = Math.floor((lawnBreadth - brickDistance) / (brickBreadth + brickDistance))
	const numCols = Math.floor((lawnLength - brickDistance) / (brickLength + brickDistance))

	// Calculate the actual brick dimensions including spacing
	const actualBrickLength = (lawnLength - (numCols + 1) * brickDistance) / numCols
	const actualBrickBreadth = (lawnBreadth - (numRows + 1) * brickDistance) / numRows

	// Calculate the remaining upper area
	const remainingUpperArea = lawnLength * lawnBreadth - totalBrickArea

	// Calculate the center of the lawn
	const lawnCenterX = lawnLength / 2
	const lawnCenterY = lawnBreadth / 2

	// Initialize variables to keep track of current position
	let currentX = (lawnLength - numCols * (actualBrickLength + brickDistance) + brickDistance) / 2
	let currentY = brickDistance

	// Array to store brick positions
	const brickPositions = []

	// Loop through the rows and columns of bricks
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			// Calculate the position of the brick
			const brickX = currentX
			const brickY = currentY

			// Move to the next position horizontally
			currentX += actualBrickLength + brickDistance

			// Place the brick within the lawn boundaries
			if (
				currentX + actualBrickLength <= lawnLength &&
				currentY + actualBrickBreadth <= lawnBreadth
			) {
				// Brick fits within the lawn, so add its position to the array
				brickPositions.push({ x: brickX, y: brickY })
			} else {
				// Brick cannot fit within the lawn, handle this case as needed
				console.log(`Brick at row ${row + 1}, column ${col + 1} cannot fit within the lawn.`)
			}
		}
		// Reset the X position for the next row
		currentX = (lawnLength - numCols * (actualBrickLength + brickDistance) + brickDistance) / 2
		currentY += actualBrickBreadth + brickDistance
	}

	// Calculate the center of the group of bricks
	const groupCenterX = totalBrickArea > 0 ? (lawnLength - (numCols - 1) * brickDistance) / 2 : 0
	const groupCenterY = (lawnBreadth - (numRows - 1) * brickDistance) / 2

	// Adjust brick positions to center the group within the lawn
	brickPositions.forEach((brick) => {
		brick.x += lawnCenterX - groupCenterX
		brick.y += lawnCenterY - groupCenterY
	})

	// Return the array of brick positions
	return brickPositions
}

const positionWithForbiddenZones = (
	numBricks,
	brickLength,
	brickBreadth,
	lawnLength,
	lawnBreadth,
	brickDistance,
	forbiddenZones,
	clockwise = true
) => {
	// Calculate the total area of bricks
	const totalBrickArea = numBricks * brickLength * brickBreadth

	// Calculate the number of rows and columns of bricks
	const numRows = Math.floor((lawnBreadth - brickDistance) / (brickBreadth + brickDistance))
	const numCols = Math.floor((lawnLength - brickDistance) / (brickLength + brickDistance))

	// Calculate the actual brick dimensions including spacing
	const actualBrickLength = (lawnLength - (numCols + 1) * brickDistance) / numCols
	const actualBrickBreadth = (lawnBreadth - (numRows + 1) * brickDistance) / numRows

	// Calculate the remaining upper area
	const remainingUpperArea = lawnLength * lawnBreadth - totalBrickArea

	// Calculate the center of the lawn
	const lawnCenterX = lawnLength / 2
	const lawnCenterY = lawnBreadth / 2

	// Initialize variables to keep track of current position
	let currentX, currentY

	// Depending on the clockwise option, set the initial position
	if (clockwise) {
		currentX = (lawnLength - numCols * (actualBrickLength + brickDistance) + brickDistance) / 2
		currentY = brickDistance
	} else {
		currentX = lawnLength - brickDistance - actualBrickLength
		currentY = (lawnBreadth - numRows * (actualBrickBreadth + brickDistance) + brickDistance) / 2
	}

	// Array to store brick positions
	const brickPositions = []

	// Loop through the rows and columns of bricks
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			// Calculate the position of the brick
			const brickX = currentX
			const brickY = currentY

			// Check if the brick position is within any forbidden zone
			const isWithinForbiddenZone = forbiddenZones.some(
				(zone) =>
					brickX + actualBrickLength >= zone.x1 &&
					brickX <= zone.x2 &&
					brickY + actualBrickBreadth >= zone.y1 &&
					brickY <= zone.y2
			)

			// If the position is not within a forbidden zone, add it
			if (!isWithinForbiddenZone) {
				brickPositions.push({ x: brickX, y: brickY })
			}

			// Move to the next position based on the specified order (clockwise or counter-clockwise)
			if (clockwise) {
				currentX += actualBrickLength + brickDistance
			} else {
				currentX -= actualBrickLength + brickDistance
			}

			// Place the brick within the lawn boundaries
			if (currentX + actualBrickLength > lawnLength) {
				currentX = (lawnLength - numCols * (actualBrickLength + brickDistance) + brickDistance) / 2
				currentY += actualBrickBreadth + brickDistance
			}
		}

		// Reset the X position for the next row
		if (clockwise) {
			currentX = (lawnLength - numCols * (actualBrickLength + brickDistance) + brickDistance) / 2
		} else {
			currentX = lawnLength - brickDistance - actualBrickLength
		}

		currentY += actualBrickBreadth + brickDistance
	}

	// Calculate the center of the group of bricks
	const groupCenterX = totalBrickArea > 0 ? (lawnLength - (numCols - 1) * brickDistance) / 2 : 0
	const groupCenterY = (lawnBreadth - (numRows - 1) * brickDistance) / 2

	// Adjust brick positions to center the group within the lawn
	brickPositions.forEach((brick) => {
		brick.x += lawnCenterX - groupCenterX
		brick.y += lawnCenterY - groupCenterY
	})

	// Return the array of brick positions
	return brickPositions
}

function placeBricks(
	numBricks,
	brickLength,
	brickBreadth,
	lawnLength,
	lawnBreadth,
	brickDistance,
	forbiddenZones,
	margin = 0
) {
	const bricks = []

	// Create a grid to represent the lawn, initialize it as empty
	const grid = Array.from({ length: lawnLength }, () =>
		Array.from({ length: lawnBreadth }, () => 0)
	)

	// Mark forbidden zones as occupied in the grid
	forbiddenZones.forEach((zone) => {
		const [x1, y1, x2, y2] = zone
		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				if (x >= 0 && x < lawnLength && y >= 0 && y < lawnBreadth) {
					grid[x][y] = 1
				}
			}
		}
	})

	// Function to check if a brick can be placed at a given position
	function canPlaceBrick(x, y) {
		for (let i = x; i < x + brickLength; i++) {
			for (let j = y; j < y + brickBreadth; j++) {
				if (
					i < margin ||
					i >= lawnLength - margin ||
					j < margin ||
					j >= lawnBreadth - margin ||
					grid[i][j] === 1
				) {
					return false // Brick cannot be placed here
				}
			}
		}
		return true
	}

	// Place the bricks on the lawn
	let brickCount = 0
	let x = margin
	let y = margin

	while (brickCount < numBricks) {
		if (x >= lawnLength - margin) {
			x = margin
			y += brickDistance
		}

		if (y >= lawnBreadth - margin) {
			break // No more space to place bricks
		}

		if (canPlaceBrick(x, y)) {
			bricks.push({ x, y })
			brickCount++

			// Mark the grid as occupied by the brick
			for (let i = x; i < x + brickLength; i++) {
				for (let j = y; j < y + brickBreadth; j++) {
					grid[i][j] = 1
				}
			}
		}

		x += brickDistance
	}

	return bricks
}

export const forbiddenZones = [
	{
		top: 200,
		left: 250,
		width: 500,
		height: 250,
	},
	{
		top: 50,
		left: 250,
		width: 500,
		height: 100,
	},
]
// const forbiddenZones = [{ x1: 200, x2: 200, y1: 200, y2: 300 }]

export const addPositionToNodes = (nodes = [], areaWidth, areaHeight, nodeWidth, nodeHeight) => {
	const nodeSize = { width: nodeWidth, height: nodeHeight }
	// const positions = generateNodePositions(areaWidth, areaHeight, nodeSize, nodes.length)
	// const newPositions = calculateBrickPositions(
	// 	nodes.length,
	// 	nodeWidth,
	// 	nodeHeight,
	// 	areaWidth,
	// 	areaHeight,
	// 	40
	// )

	// const forbiddenZonesCoordinates = forbiddenZones.map((forbiddenZone) => ({
	// 	x1: forbiddenZone.left,
	// 	y1: forbiddenZone.top,
	// 	x2: forbiddenZone.left + forbiddenZone.width,
	// 	y2: forbiddenZone.top + forbiddenZone.height,
	// }))
	// const positions = positionWithForbiddenZones(
	// 	nodes.length,
	// 	nodeWidth,
	// 	nodeHeight,
	// 	areaWidth,
	// 	areaHeight,
	// 	20,
	// 	forbiddenZonesCoordinates
	// )

	const forbiddenZonesCoordinates = forbiddenZones.map((forbiddenZone) => {
		return [
			forbiddenZone.left,
			forbiddenZone.top,
			forbiddenZone.left + forbiddenZone.width,
			forbiddenZone.top + forbiddenZone.height,
		]
	})
	const positions = placeBricks(
		nodes.length,
		nodeWidth,
		nodeHeight,
		areaWidth,
		areaHeight,
		40,
		forbiddenZonesCoordinates,
		20
	)
	console.log("positions", positions)
	console.log("coordinates", forbiddenZonesCoordinates)
	return nodes.map((node, i) => ({ ...node, position: positions[i] }))
}
