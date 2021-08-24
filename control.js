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
function startGame() {

    timer = setInterval(() => {
        if (!isMoved) {
            unDraw();
            position += WIDTH;
            draw();
            updatePoints(1);
        }
        stop();
        isMoved = false;
    }, 600);

}

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


function moveParallel(dir) {
    unDraw();

    if (dir === LEFT && isMoveable(dir)) {
        position -= 1;
    }
    else if (dir === RIGHT && isMoveable(dir)) {
        position += 1;
    }

    draw();
    isMoved = true;
}

function isMoveable(dir) {

    if (dir === RIGHT) {
        if (isAtRight())
            return false;
        if (shape.some(index => cells[index + position + 1].classList.contains('end')))
            return false
    }

    if (dir === LEFT) {
        if (isAtLeft())
            return false;
        if (shape.some(index => cells[index + position - 1].classList.contains('end')))
            return false
    }

    return true;
}

function changeVariant() {
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
    return shape.some(index => (position + index) % WIDTH === WIDTH - 1)
}

function isAtLeft() {
    return shape.some(index => (position + index) % WIDTH === 0)
}



function moveDown() {

    unDraw();
    position += 10;
    updatePoints(1);
    draw();
    stop();
}

