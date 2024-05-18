// generating Random Set of Numbers each time the page loads

let firstChoice = 0
let secondChoice = 0
let firstClass = ''
let activeOperation = true
function generateMyArray(){
    let obj = {}
    let value = Object.values(obj).reduce((acc, val) => acc + val, 0)
    let myArray = []
    while(value < 36){
        let random = Math.ceil(Math.random() * 18)
        if(obj[random]){
            if(obj[random] === 1){
                obj[random] = 2
                myArray.push(random)
            }
        }
        else{
            obj[random] = 1
            myArray.push(random)
        }
        value = Object.values(obj).reduce((acc, val) => acc + val, 0)
    }
    return myArray
}
let randomGame = generateMyArray()

// Constructing the main layout

let mySet = new Set()

const containerDiv = document.querySelector('.container')

randomGame.forEach(elem => {
    const squareDiv = document.createElement('div')
    if(!mySet.has(elem)){
        squareDiv.classList.add('square','number' + elem + 'One', 'nonActive')
        mySet.add(elem)
    }
    else{
        squareDiv.classList.add('square','number' + elem + 'Two', 'nonActive')
    }
    
    const numbers = document.createElement('p')
    numbers.classList.add(elem)
    numbers.innerText = elem

    squareDiv.append(numbers)
    containerDiv.append(squareDiv)

    squareDiv.addEventListener('click', mainOne)
})

let remaining = 0

// Checking if cards matches or not, then remove the matched ones

function mainOne(event){
    if(activeOperation){
        if(firstChoice === 0){
            firstChoice = this.innerText
            firstClass = this.classList
        }
        else{
            secondChoice = this.innerText
        }
        this.classList.remove('nonActive')
        this.classList.add('active')
        if(secondChoice !== 0){
            activeOperation = false
            if(firstChoice !== secondChoice){
                setTimeout(() => {
                    document.querySelector(`.${firstClass[1]}`).classList.remove('active')
                    document.querySelector(`.${firstClass[1]}`).classList.add('nonActive')
                    this.classList.remove('active')
                    this.classList.add('nonActive')
                    firstChoice = 0
                    secondChoice = 0
                    firstClass = ''
                    activeOperation = true
                }, 750)
            }
            else{
                setTimeout(() => {
                    document.querySelector(`.${firstClass[1]}`).classList.remove('active')
                    document.querySelector(`.${firstClass[1]}`).classList.add('correct')
                    this.classList.remove('active')
                    this.classList.add('correct')
                    this.removeEventListener('click', mainOne)
                    document.querySelector(`.${firstClass[1]}`).removeEventListener('click', mainOne)
                    firstChoice = 0
                    secondChoice = 0
                    firstClass = ''
                    activeOperation = true
                    if(document.querySelectorAll('.correct').length === 36){
                        clearInterval(interval)
                        timerDiv.innerText = `Congratulation, You passed on: ${timer}s`
                    }
                }, 750)
            }
        }
    }
}
