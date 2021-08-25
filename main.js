const grid = document.querySelector('.grid');
const points = document.getElementById('points');
const startStop = document.getElementById('startstop');
const HEIGHT = 20; //no of divs/cells vertically
const WIDTH = 10; // no of divs/cells horizontallyy
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
let timer;
let over = false;
let isMoved;
//will update the score
function updatePoints(val) {

    let score = +points.innerText;
    points.innerText = score + (val ?? 0);

}

for (let i = 0; i < 200; i++) {
    let cell = document.createElement('div');
    // cell.classList.add('clear');
    grid.appendChild(cell);
}
// these are added at the bottom to mark the ending row
for (let i = 0; i < 10; i++) {
    let cell = document.createElement('div');
    cell.classList.add('end');
    grid.appendChild(cell);
}

let cells = Array.from(grid.children);
