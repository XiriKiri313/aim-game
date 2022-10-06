const startBtn=document.querySelector('#start')
const screens=document.querySelectorAll('.screen')
const timeList=document.querySelector('#time-list')
const timeEl=document.querySelector('#time')
const board=document.querySelector('#board')
const colors = ['linear-gradient(45deg, #FFFF00 47%, #FF4500 100%)',
 'linear-gradient(30deg, #EE82EE 47%, #4B0082 100%)',
  'linear-gradient(50deg, #F4A460 47%, #DAA520 100%)',
   'linear-gradient(50deg, #228B22 47%, #20B2AA 100%)',
   'linear-gradient(54deg, #F0E68C 47%, #FFE4B5 100%)',
   'linear-gradient(45deg, #DC143C 47%, #FA8072 100%)',
   'linear-gradient(25deg, #00FA9A 47%, #FFC0CB 100%)',
   'linear-gradient(45deg, #0000FF 47%, #191970 100%)']

let time=0
let score=0

startBtn.addEventListener('click', (event) => {
    event.preventDefault
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')) {
       time =parseInt(event.target.getAttribute('data-time'))
       screens[1].classList.add('up')
       startGame() 
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else{
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle=document.createElement('div')
    const size=getRandomNumber(10, 60)
    const {width,height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)
    
    circle.style.background = getRandomColor()
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random()*(max-min)+min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

function winTheGame() {
    function kill() {
        const circle=document.querySelector('.circle')

        if (circle) {
            circle.click()
        }

        circle.click()
    }

    setInterval(kill, 1)
}