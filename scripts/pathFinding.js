const grillePathfinding = document.getElementById("grillePathfinding");

function makeGrid(height, width) {
    grillePathfinding.style.setProperty("--grid-heigth", height);
    grillePathfinding.style.setProperty("--grid-width", width);

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            let cell = document.createElement("cell");
            cell.id = "x" + x.toString() + "y" + y.toString();
            cell.style.border = "1px solid rgb(75, 75, 75)";
            cell.style.backgroundColor = View.cellStyle.normalCell.color;

            grillePathfinding.appendChild(cell).className = "grid-item";
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
    cell = document.getElementById(toGridCoords(x, y));
    cell.style.backgroundColor = View.cellStyle.startCell.color;
    grid.getCellAt(x, y).start = true;
}

function setGoalPos(x, y) {
    cell = document.getElementById(toGridCoords(x, y));
    cell.style.backgroundColor = View.cellStyle.goalCell.color;
    grid.getCellAt(x, y).goal = true;
}

function styleOnHover(event) {
    // clear hover effect of cell that we left
    xpos = event.pageX;
    ypos = event.pageY;
    // get cell coords (everything is offest by 1/2 of a cell's height and width to apply effect perfectly when cell is entered)
    x = (View.width / window.innerWidth) * (xpos - window.innerWidth / (2 * View.width));
    y = (View.height / window.innerHeight) * (ypos - window.innerHeight / (2 * View.height));

    // change cell style

    cell = document.getElementById(toGridCoords(x, y));

    cell.style.backgroundColor = "red";

    cell.addEventListener("mouseleave", (e) => {
        cell.style.backgroundColor = "green";
    });
}

function placeWalls(x, y, grid) {
    cell = document.getElementById(toGridCoords(x, y));
    if (!grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
        cell.style.backgroundColor = View.cellStyle.obstructedCell.color;
        grid.getCellAt(x, y).obstructed = true;
    }
}

function removeWalls(x, y, grid) {
    cell = document.getElementById(toGridCoords(x, y));

    if (grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
        cell.style.backgroundColor = View.cellStyle.normalCell.color;
        grid.getCellAt(x, y).obstructed = false;
    }
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
            color: "green",
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
            color: "yellow",
        },

        inClosedSet: {
            color: "purple",
        },
    },
};

//create visual grid
makeGrid(View.height, View.width);

//create js grid (a matrix)
grid = new Grid(View.height, View.width);

setStartPos(Math.round(View.width / 6), Math.round(View.height / 2), grid);
setGoalPos(Math.round(View.width / 1.2), Math.round(View.height / 2), grid);

//prevent elements from being draggable, which can cause problems when placing walls
window.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

window.addEventListener("drop", (e) => {
    e.preventDefault();
});

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
