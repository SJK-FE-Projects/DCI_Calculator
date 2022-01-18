const liczby = document.querySelectorAll('.liczba');
const operatory = document.querySelectorAll('.operator');
const wyczysc = document.querySelector('.wyczysc');
const usun = document.querySelector('.usun');
const rownosc = document.querySelector('.rownosc');
const prevResult = document.querySelector('.poprzednie-dzialanie');
const currResult = document.querySelector('.aktualne-dzialanie');


let currOperation = '';
let operation = undefined;
let prevOperation = '';
let calculation;
let resultStatus = false


const clearResult = () => {
    currOperation = ''
    operation = undefined
    prevOperation = ''
    let resultStatus = false

}

const nieDzielZerem = () => {
    operation = undefined;
    prevOperation = ' ';
    currOperation = 'Nie dziel zerem';
};

const updateResult = () => {
    // if (currOperation isNaN){
    //     clearResult()
    // }
    currResult.innerText = currOperation;
    prevResult.innerText = prevOperation;
};

const wsadzLiczbe = (liczba) => {
    if (liczba === '•') {
        if (currOperation.includes('.')) {
            return
        }
        liczba = '.'
    }
    currOperation = currOperation.toString() + liczba.toString()
};

const usunLiczbe = () => {
    currOperation = currOperation.toString().slice(0, -1)
}

const wybierzOperacje = (operator) => {
    if (currOperation === '') {
        return
    }
    if (isNaN(parseFloat(currOperation))) {
        clearResult()
    }
    if (prevOperation !== '') {
        let poprzednie = prevResult.innerText
        if (currOperation.toString() === '0' && poprzednie[poprzednie.length - 1] === '÷') {
            clearResult()
            updateResult()
        }
        oblicz()
    }

    operation = operator
    prevOperation = currOperation
    currOperation = ''
}

const oblicz = () => {
    let calculation;
    if (!prevOperation || !currOperation) {
        clearResult()
        return
    }
    const poprzednie = parseFloat(prevOperation)
    const obecne = parseFloat(currOperation)
    if (isNaN(poprzednie) || isNaN(obecne)) {
        clearResult()
        return
    }
    switch (operation) {
        case '+':
            calculation = poprzednie + obecne
            break;
        case '-':
            calculation = poprzednie - obecne
            break;
        case '*':
            calculation = poprzednie * obecne
            break;
        case '÷':
            if (obecne === 0) {
                clearResult()
                nieDzielZerem()
                return
            }
            calculation = poprzednie / obecne
            break;
        case '√':
            calculation = Math.pow(poprzednie, 1 / obecne)
            break;
        case '%':
            calculation = poprzednie / 100 * obecne
            break;
        case '^':
            calculation = Math.pow(poprzednie, obecne)
            break;
        case 'log':
            calculation = Math.log(poprzednie) / Math.log(obecne)
            break;
        default:
            return

    }
    currOperation = calculation;
    operation = undefined;
    prevOperation = '';
    resultStatus = true;

}

liczby.forEach((liczba) => {
    liczba.addEventListener('click', () => {
        wsadzLiczbe(liczba.innerText)
        updateResult()
    })
})

usun.addEventListener('click', () => {
    usunLiczbe()
    updateResult()
})

operatory.forEach((operator) => {
    operator.addEventListener('click', () => {
        wybierzOperacje(operator.innerText)
        updateResult()
    })
})
wyczysc.addEventListener('click', () => {
    clearResult()
    updateResult()
})

rownosc.addEventListener('click', () => {
    oblicz()
    updateResult()
})