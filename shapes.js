const L = [
    [1, 2, 2 + WIDTH, 2 + (2 * WIDTH)],
    [1, 1 + WIDTH, 1 + (2 * WIDTH), 2 + (2 * WIDTH)],
    [1, 2, 3, 1 + WIDTH],
    [1 + WIDTH, 2 + WIDTH, 3 + WIDTH, 3],
]
const I = [
    [1, 1 + WIDTH, 1 + (2 * WIDTH), 1 + (3 * WIDTH)],
    [1, 2, 3, 4],
    [1, 1 + WIDTH, 1 + (2 * WIDTH), 1 + (3 * WIDTH)],
    [1, 2, 3, 4],
]
const Z = [
    [2, 2 + WIDTH, 1 + WIDTH, 1 + (2 * WIDTH)],
    [1, 2, 2 + WIDTH, 3 + WIDTH],
    [2, 2 + WIDTH, 1 + WIDTH, 1 + (2 * WIDTH)],
    [1, 2, 2 + WIDTH, 3 + WIDTH]
]

const O = [
    [0, 1, WIDTH, 1 + WIDTH],
    [0, 1, WIDTH, 1 + WIDTH],
    [0, 1, WIDTH, 1 + WIDTH],
    [0, 1, WIDTH, 1 + WIDTH],
]

const T = [
    [0, 1, 2, 1 + WIDTH],
    [1, 1 + WIDTH, 1 + (2 * WIDTH), WIDTH],
    [1, WIDTH, 1 + WIDTH, 2 + WIDTH],
    [0, WIDTH, 2 * WIDTH, WIDTH + 1],

];


const colors = ["#FF851F", '#01FF70', '#0074D9', '#85144b', '#FFDC00'];
const shapes = [L, I, Z, O, T]

let current = getRandomShape();
let variant = 0;
let shape = [];
let position = 4;

// set a shape for the first time;
setShape();

function setShape() {
    shape = shapes[current][variant];
}

// sets a new random shape each time an existing shape finishes the fall
function setRandomShape() {
    current = getRandomShape();
    setShape();
}

// drawing logic is to add a class 'moving' to divs which will color them
// these colored div's make the shape 
function draw() {
    shape.forEach(pos => {
        cells[pos + position].classList.add('moving');
        cells[pos + position].style.backgroundColor = colors[current];
    })
}

// undraw will remove the 'moving' class from the divs
// we will undraw to move the divs to next row/step
function unDraw() {
    shape.forEach(pos => {
        cells[pos + position].style.backgroundColor = "";
        cells[pos + position].classList.remove('moving')
    })
}

// this function checks if the shape's next row contains any div with class 'end'
// if it does them the shape will stop moving and add class 'end' to itself 
// class 'end' means that the shape has completed the fall
function stop() {
    if (shape.some(index => cells[position + index + WIDTH].classList.contains('end'))) {
        shape.forEach(cell => {
            cells[cell + position].classList.add('end')
        })
        setRandomShape();
        position = 4;

        clearRows(); // check if we need to clear rows
        gameOver();
    }

}

function getRandomShape() { return Math.floor(Math.random() * shapes.length) }

function clearRows() {

    for (let i = 0; i < 199; i += WIDTH) {

        const singleRow = [];

        let j = 0;
        while (j < 10) {
            singleRow.push(i + j)
            j++;
        }
        // this loop makes array with index of a row
        // and then checks if all the indexes contain class 'end'

        let isComplete = singleRow.every((item) => {
            //check wether all the cells of a row contains the class end
            return cells[item].classList.contains('end')
        })

        // if all cells/divs contains class 'end' then it removes the classes 'end','moving'
        // and adds this row to the top of the grid 

        if (isComplete) {
            updatePoints(10);
            singleRow.forEach((item) => {
                cells[item].classList.remove('end')
                cells[item].classList.remove('moving')
                cells[item].style.backgroundColor = "";

            });

            let removedCells = cells.splice(i, WIDTH);

            cells = removedCells.concat(cells);

            cells.forEach(cell => grid.appendChild(cell))

        }

    }


}

// this function checks whether the newly appeared shape collides with the 
// existing shape as soon as new shape appears
// if it does than game overs becuase this only happens when the stage is filled with 
// shapes
function gameOver() {

    if (shape.some((current) => {
        return cells[current + position].classList.contains('end')
    })) {
        over = true;
        pauseGame();
        startStop.innerText = "Restart"
        setGameOverText();
    }

}


const setGameOverText = () => {
    cells[12].innerHTML = `<div class="gameover">
    <p>Game Over</p>
</div>`
}
const removeGameOverText = () => {
    cells[12].innerHTML = '';
}


