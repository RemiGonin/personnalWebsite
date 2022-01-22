const grillePathfinding = document.getElementById("grillePathfinding");

function makeGrid(height, width) {
    grillePathfinding.style.setProperty("--grid-heigth", height);
    grillePathfinding.style.setProperty("--grid-width", width);

    for (c = 0; c < width * height; c++) {
        let cell = document.createElement("div");

        grillePathfinding.appendChild(cell).className = "grid-item";
    }
}

aspectRatio = window.innerWidth / window.innerHeight;
height = 40;
makeGrid(height, (Math.round(aspectRatio * 10) / 10) * height); //not sure why but doesn't make a good grid if aspect ratio has more than 1 decmimal
