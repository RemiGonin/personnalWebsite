//A* implementation

//we use a priority queue to have O(1) time complexity for each loop (else we would have to sort at nlogn time complexity for each loop) from heap.js script
function AStarAlgorithm(startX, startY, goalX, goalY, grid) {
    startNode = grid.getCellAt(startX, startY);
    startNode.g = 0;

    goalNode = grid.getCellAt(goalX, goalY);

    startNode.f = euclidianDistance(startNode, goalNode) + 0; //g for the first node is set at 0

    cameFrom = [];

    //priority is f, lowest f at the top of the queue :
    const customPriorityComparator = (node1, node2) => {
        if (node1.f > node2.f) {
            return 1;
        } else if (node1.f <= node2.f) {
            return -1;
        }
    };
    var openSet = new Heap(customPriorityComparator);
    openSet.push(startNode);

    // var bestGScore =
    while (!openSet.empty()) {
        currentNode = openSet.pop();

        if (currentNode == goalNode) {
            return reconstructPath(goalNode, startNode);
        }

        nb = grid.getNeighbors(currentNode);
        for (i = 0, l = nb.length; i < l; ++i) {
            neighbor = nb[i];

            if (!neighbor.hasOwnProperty("g")) {
                neighbor.g = Infinity; // If a cell hasn't been opened yet, it will not have a g score, we set it to infinity here.
            }

            if (currentNode.g + 1 < neighbor.g) {
                neighbor.g = currentNode.g + 1;
                neighbor.f = currentNode.g + 1 + euclidianDistance(neighbor, goalNode);
                neighbor.cameFrom = currentNode;

                if (!openSet.contains(neighbor, 0)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    console.log("aled");
}

function reconstructPath(goalNode, startNode) {
    path = [goalNode];
    currentNode = goalNode;

    while (!(currentNode === startNode)) {
        //we follow the path from goal to start by following previous nodes each time
        currentNode = currentNode.cameFrom;
        path.push(currentNode);
    }

    return path;
}

//function to calculate euclidian distance between two nodes, corresponds to h in A*
function euclidianDistance(cellA, cellB) {
    return Math.sqrt(Math.pow(cellA.x - cellB.x, 2) + Math.pow(cellA.y - cellB.y, 2));
}
