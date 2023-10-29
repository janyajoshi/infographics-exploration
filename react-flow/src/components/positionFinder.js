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

export const addPositionToNodes = (nodes = [], areaWidth, areaHeight, nodeWidth, nodeHeight) => {
	const nodeSize = { width: nodeWidth, height: nodeHeight }
	const positions = generateNodePositions(areaWidth, areaHeight, nodeSize, nodes.length)

	const newPositions = calculateBrickPositions(
		nodes.length,
		nodeWidth,
		nodeHeight,
		areaWidth,
		areaHeight,
		80
	)
	console.log("newPositions", newPositions)
	return nodes.map((node, i) => ({ ...node, position: newPositions[i] }))
}
