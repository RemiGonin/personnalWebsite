const gridPathfinding = document.getElementById("gridPathfinding");

function makeGrid(height, width) {
    gridPathfinding.style.setProperty("--grid-heigth", height);
    gridPathfinding.style.setProperty("--grid-width", width);

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            let CSScell = document.createElement("cell");
            CSScell.id = "x" + x.toString() + "y" + y.toString();
            CSScell.style.border = "1px solid rgb(75, 75, 75)";
            CSScell.style.backgroundColor = View.cellStyle.normalCell.color;

            gridPathfinding.appendChild(CSScell).className = "grid-item";
        }
    }
}

function toGridCoords(x, y) {
    return "x" + Math.round(x).toString() + "y" + Math.round(y).toString();
}

function toScreenCoords() {
    x = (View.width / window.innerWidth) * (event.pageX - window.innerWidth / (2 * View.width));
    y = (View.height / window.innerHeight) * (event.pageY - window.innerHeight / (2 * View.height));
    x = Math.round(x);
    y = Math.round(y);
    return x, y;
}

function setStartPos(x, y, grid) {
    CSScell = document.getElementById(toGridCoords(x, y));
    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
    grid.getCellAt(x, y).start = true;
}

function setGoalPos(x, y) {
    CSScell = document.getElementById(toGridCoords(x, y));
    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
    grid.getCellAt(x, y).goal = true;
}

function clearGrid(grid, clearWalls) {
    grid.cells.forEach((cellRow) => {
        cellRow.forEach((cell) => {
            CSScell = document.getElementById(toGridCoords(cell.x, cell.y));

            if (clearWalls) {
                if (cell.obstructed) {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                } else if (cell.start) {
                    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
                } else if (cell.goal) {
                    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
                } else {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                }
                cell.obstructed = false;
            } else {
                if (cell.obstructed) {
                    CSScell.style.backgroundColor = View.cellStyle.obstructedCell.color;
                } else if (cell.start) {
                    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
                } else if (cell.goal) {
                    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
                } else {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                }
            }
        });
    });
}

function listenForInteractivity(grid) {
    //prevent grid elements from being draggable, which can cause problems when placing walls
    grid.cells.forEach((cellRow) => {
        cellRow.forEach((cell) => {
            CSScell = document.getElementById(toGridCoords(cell.x, cell.y));

            CSScell.addEventListener("dragstart", (e) => {
                e.preventDefault();
            });

            CSScell.addEventListener("drop", (e) => {
                e.preventDefault();
            });
        });
    });

    function placeWalls(x, y, grid) {
        CSScell = document.getElementById(toGridCoords(x, y));
        if (!grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
            CSScell.style.backgroundColor = View.cellStyle.obstructedCell.color;
            grid.getCellAt(x, y).obstructed = true;
        }
    }

    function removeWalls(x, y, grid) {
        CSScell = document.getElementById(toGridCoords(x, y));

        if (grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
            CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
            grid.getCellAt(x, y).obstructed = false;
        }
    }

    //placing and removing walls :
    window.addEventListener("pointerdown", function pointerdownFunc(event) {
        x, (y = toScreenCoords());

        placeWall = false;
        removeWall = false;
        if (!grid.getCellAt(x, y).obstructed) {
            placeWall = true;
            placeWalls(x, y, grid);
        } else {
            removeWall = true;
            removeWalls(x, y, grid);
        }

        window.addEventListener("pointermove", function pointerMoveFunc(event2) {
            x, (y = toScreenCoords());

            if (placeWall == true) {
                placeWalls(x, y, grid);
            }
            if (removeWall == true) {
                removeWalls(x, y, grid);
            }
        });

        window.addEventListener("pointerup", function pointerUpFunc(e) {
            placeWall = false;
            removeWall = false;
        });
    });
}

function getWidth(height) {
    //since we define grid items as squares in our css, we need to get the number of columns by calculating from the number of rows
    return (Math.round((window.innerWidth / window.innerHeight) * 10) / 10) * height;
}

var View = {
    height: 40, //number of rows

    width: getWidth(40),

    cellStyle: {
        startCell: {
            color: "chartreuse",
        },

        goalCell: {
            color: "red",
        },

        normalCell: {
            color: "#262626",
        },

        obstructedCell: {
            color: "black",
        },

        border: {
            color: "rgb(75, 75, 75)",
        },

        inOpenSet: {
            color: "#1c7100",
        },

        inClosedSet: {
            color: "lightblue",
        },

        inPath: {
            color: "yellow",
        },
    },
};

//create visual grid
makeGrid(View.height, View.width);

//create js grid (a matrix)
grid = new Grid(View.height, View.width);

startX = Math.round(View.width / 6);
startY = Math.round(View.height / 2);
goalX = Math.round(View.width / 1.2);
goalY = Math.round(View.height / 2);

setStartPos(startX, startY, grid);
setGoalPos(goalX, goalY, grid);

listenForInteractivity(grid);

function launchAlgorithm(alg, diagonal) {
    if (alg == "AStar") {
        //clear previous path
        if (typeof hasBeenLaunched !== "undefined") {
            if (path != 1) {
                clearGrid(grid, false);
            }
        }

        returnValues = AStarAlgorithmOneIteration(startX, startY, goalX, goalY, grid, "firstTime", diagonal);
        state = returnValues[0];
        data = returnValues[1];

        clockAStar = setInterval(runOneIterationAStar, 1);

        function runOneIterationAStar() {
            if (state == 1) {
                //fail
                clearInterval(clockAStar);
                return 1;
            } else if (state == 0) {
                //success
                hasBeenLaunched = true;
                path = data;
                //show path
                path.forEach((cell) => {
                    CSScell = document.getElementById(toGridCoords(cell.x, cell.y));
                    CSScell.style.backgroundColor = View.cellStyle.inPath.color;
                });
                clearInterval(clockAStar);
                return 1;
            } else if (state == 2) {
                //continue
                openSet = data;

                openSet.nodes.forEach((cell) => {
                    if (!(cell.goal || cell.start)) {
                        CSScell = document.getElementById(toGridCoords(cell.x, cell.y));
                        CSScell.style.backgroundColor = View.cellStyle.inOpenSet.color;
                    }
                });

                exploredCell = openSet.nodes[0];
                if (!(exploredCell.goal || exploredCell.start)) {
                    CSScell = document.getElementById(toGridCoords(exploredCell.x, exploredCell.y));
                    CSScell.style.backgroundColor = View.cellStyle.inClosedSet.color;
                }

                returnValues = AStarAlgorithmOneIteration(startX, startY, goalX, goalY, grid, openSet, diagonal);
                state = returnValues[0];
                data = returnValues[1];
            }
        }
    }
}

// Controller

document.getElementById("startSearch").addEventListener("click", function () {
    diagonal = document.getElementById("diagonal").checked;
    launchAlgorithm("AStar", diagonal);
});

document.getElementById("clearWalls").addEventListener("click", function () {
    clearGrid(grid, true);
});

//draggability of controller
dragElement(document.getElementById("controller"));
function dragElement(elmnt) {
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;

    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:

        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
