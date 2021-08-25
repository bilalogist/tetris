draw();

// listens for the start stop button
startStop.addEventListener('click', () => {

    // check if there is any timer 
    // if it is present then the game would be paused other 
    // wise game would be in pause state and will be resumed  

    if (timer) {
        pauseGame();
        startStop.innerText = 'Resume'
    }
    else {
        if (over) {
            over = false;
            removeGameOverText();
            points.innerHTML = 0;
            cells.forEach(
                (cell, index) => {
                    if (index < cells.length - WIDTH) {
                        cell.classList.remove('end')
                        cell.classList.remove('moving')
                        cell.style.backgroundColor = ''
                    }
                }
            )
        }
        startGame();
        startStop.innerText = 'Pause'
    }

});


// this function starts the game 

function startGame() {

    timer = setInterval(() => {
        if (!isMoved) {
            unDraw(); // undraws the shape i.e removes the classes
            position += WIDTH; // add width to the pointer which will move to the next line
            draw();    // draw again the shape in next liune i.e add the color classes
            updatePoints(1);    // increase score by 1
        }
        stop();
        isMoved = false;
    }, 600);

}

// this will clear the setInterval 
function pauseGame() {
    clearInterval(timer);
    timer = null;
}

document.onkeydown = function (e) {
    if (!over && timer)
        switch (e.code) {
            case 'ArrowRight':
                moveParallel(RIGHT)
                break;
            case 'ArrowLeft':
                moveParallel(LEFT)
                break;
            case 'ArrowUp':
                changeVariant();
                break;
            case 'ArrowDown':
                moveDown();
                break;

        }

}

// this will be used to move the shape right or left
function moveParallel(dir) {
    unDraw();

    if (dir === LEFT && isMoveable(dir)) {
        position -= 1; // decrement the position by 1 to move left
    }
    else if (dir === RIGHT && isMoveable(dir)) {
        position += 1;  // incerment the position by 1 to move right
    }

    draw();
    isMoved = true;
}

function isMoveable(dir) {
    // will check if the shape is at the right or left edge 

    if (dir === RIGHT) {
        // doesn't allow to move right if shape is already at the right edge
        // or if there is already any shape at the right
        if (isAtRight())
            return false;

        if (shape.some(index => cells[index + position + 1].classList.contains('end')))
            return false
    }

    if (dir === LEFT) {
        // doesn't allow to move left it shape is already at the left edge
        // or if there is already any shape at the left
        if (isAtLeft())
            return false;
        if (shape.some(index => cells[index + position - 1].classList.contains('end')))
            return false
    }

    return true;
}

function changeVariant() {
    // this function rotates the shape by changing the variant number
    unDraw();
    if (variant != 3)
        variant++;
    else variant = 0;
    setShape();
    makeRotateAble();
    draw();
}

function makeRotateAble(pos) {
    pos = pos ?? position;

    if ((pos + 1) % WIDTH < 4) {

        if (isAtRight()) {
            position += 1;
            //calling again to check if it is still rotatable
            makeRotateAble(pos)
        }
    }
    else
        if (pos % WIDTH > 5) {
            console.log(">5")
            if (isAtLeft()) {
                position -= 1
                makeRotateAble(pos)
            }
        }

}

function isAtRight() {
    //checks whether the current shape is at the right edge
    //by taking the mod of current position of shpe with width 
    // if it is equal to width-1 then it is at the edge
    return shape.some(index => (position + index) % WIDTH === WIDTH - 1)
}

function isAtLeft() {
    //checks whether the current shape is at the left edge
    //by taking the mod of current position of shape with width 
    // if it is equal to 0 then it is at the left edge
    return shape.some(index => (position + index) % WIDTH === 0)
}



function moveDown() {

    // this function helps the shape to move down quicky on key down

    unDraw();
    position += 10;
    updatePoints(1);
    draw();
    stop();
}

