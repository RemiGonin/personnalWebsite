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

function setStartPos(x, y) {
    cell = document.getElementById(toGridCoords(x, y));
    cell.style.backgroundColor = View.cellStyle.startCell.color;
}

function setGoalPos(x, y) {
    cell = document.getElementById(toGridCoords(x, y));
    cell.style.backgroundColor = View.cellStyle.goalCell.color;
}

function styleOnHover(xpos, ypos) {
    // clear hover effect of cell that we left

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
// grillePathfinding.onmousemove = styleOnHover;

function mousemove(event) {
    styleOnHover(event.pageX, event.pageY);
}

window.addEventListener("mousemove", mousemove);

//create js grid (a matrix)
grid = new Grid(View.height, View.width);

grid.buildCells(grid.height, grid.width);

setStartPos(View.width / 6, View.height / 2);
setGoalPos(View.width / 1.2, View.height / 2);
