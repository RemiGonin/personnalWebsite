function Grid(height, width) {
    this.width = width; // number of columns of the grid
    this.height = height; //number of rows of the grid
}

Grid.prototype.buildCells = function (height, width) {
    var i, j;

    const cells = [];

    for (i = 0; i < height; ++i) {
        cells[i] = [];
        for (j = 0; j < height; ++j) {
            cells[i][j] = new Cell(i, j, false);
        }
    }
};

Grid.prototype.getCellAt = function (x, y) {
    return cells[x][y];
};

Grid.prototype.getObstructionAt = function (x, y) {
    return cells[x][y].obstructed;
};

Grid.prototype.isInsideGridAt = function (x, y) {
    if (x <= this.height && x >= 0 && x <= this.width && x >= 0) {
        return True;
    } else {
        return False;
    }
};

Grid.prototype.isWalkableAt = function (x, y) {
    if (this.isInsideGridAt(x, y) == True && this.getObstructionAt(x, y) == False) {
        return True;
    } else {
        return False;
    }
};

Grid.prototype.getNeighbors = function (cell) {
    nb = [];
    x = cell.x;
    y = cell.y;

    if (this.isWalkableAt(x + 1, y)) {
        nb.push(this.getCellAt(x + 1, y));
    }

    if (this.isWalkableAt(x, y + 1)) {
        nb.push(this.getCellAt(x, y + 1));
    }

    if (this.isWalkableAt(x - 1, y)) {
        nb.push(this.getCellAt(x - 1, y));
    }

    if (this.isWalkableAt(x, y - 1)) {
        nb.push(this.getCellAt(x, y - 1));
    }

    return nb;
};
