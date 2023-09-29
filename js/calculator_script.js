(function() {
    let firstNum = '';
    let operator = '';
    let nextNum = '';
    let toggleNum = 'firstNum';
    let toggleSign = 1;
    let togglePoint = false;
    let toggleAllClear = true;
    let output = null;
    const displayStr = document.getElementById('display');
    const clearBtn = document.getElementById('clear');
    const signBtn = document.getElementById('sign');
    const percentBtn = document.getElementById('percent');
    const divideBtn = document.getElementById('divide');
    const sevenBtn = document.getElementById('seven');
    const eightBtn = document.getElementById('eight');
    const nineBtn = document.getElementById('nine');
    const multiplyBtn = document.getElementById('multiply');
    const fourBtn = document.getElementById('four');
    const fiveBtn = document.getElementById('five');
    const sixBtn = document.getElementById('six');
    const minusBtn = document.getElementById('minus');
    const oneBtn = document.getElementById('one');
    const twoBtn = document.getElementById('two');
    const threeBtn = document.getElementById('three');
    const plusBtn = document.getElementById('plus');
    const zeroBtn = document.getElementById('zero');
    const pointBtn = document.getElementById('point');
    const equalBtn = document.getElementById('equal');


    function operate() {
        // if equal is pressed immediately after first time putting firstNum
        if (operator == '' && nextNum == '' && output == null) {
            output = parseFloat(firstNum);
        } else {
            // if equal is pressed immediately after operation
            if (firstNum == '' && output != null) {
                firstNum = output;
            }
            if (nextNum == '') {
                nextNum = firstNum;
            }

            // calculate
            switch(operator) {
                case '/':
                    output = parseFloat(firstNum) / parseFloat(nextNum);
                    break;
                case '*':
                    output = parseFloat(firstNum) * parseFloat(nextNum);
                    break;
                case '-':
                    output = parseFloat(firstNum) - parseFloat(nextNum);
                    break;
                case '+':
                    output = parseFloat(firstNum) + parseFloat(nextNum);
                    break;
                case '%':
                    output = parseFloat(firstNum) / 100;
                default:
                    break;
            }
        }
        console.log('total: ' + output);
        updateDisplay(output);

        toggleNum = 'firstNum';
        firstNum = '';
        toggleSign = 1;
        togglePoint = false;
    }

    function updateDisplay(num) {
        // ensure num is string first
        num = num + "";
        if (num.length > 9) {
            let num_split = num.split('.');
            if (num_split[0].length >= 9) {
                num = num_split[0];
            } else {
                console.log(num_split[0].length);
                num_split[1] = num_split[1].slice(0, (8 - num_split[0].length));
                num = num_split.join('.');
            }
        }
        displayStr.innerText = num;
    }

    function setNum(newNum) {
        if (toggleNum == 'firstNum') {
            firstNum = firstNum + newNum;
            console.log('firstNum: ' + firstNum);
            updateDisplay(firstNum);
            nextNum = '';
        } else {
            // if after equal an operation is selected followed by a number for nextNum, firstNum is output
            if (firstNum == '' && output != null) {
                firstNum = output;
            }

            nextNum = nextNum + newNum;
            console.log('nextNum: ' + nextNum);
            updateDisplay(nextNum);
        }

        // toggle clear button
        toggleAllClear = false;
        clearBtn.innerText = 'C'
    }

    function setPoint() {
        console.log(togglePoint);
        if (togglePoint == false) {
            if (toggleNum == 'firstNum') {
                if (firstNum == '') {
                    firstNum = 0;
                }

                firstNum = firstNum + '.';
                updateDisplay(firstNum);
            } else {
                if (nextNum == '') {
                    nextNum = 0;
                }

                nextNum = nextNum + '.';
                updateDisplay(nextNum);
            }
            togglePoint = true;
        }
    }

    function setOp(op) {
        operator = op;

        if (toggleNum == 'firstNum') {
            if (firstNum == '') {
                firstNum = 0;
            }
            console.log('firstNum: ' + firstNum);
            toggleNum = 'nextNum';
            nextNum = '';
            togglePoint = false;
        } else {
            operate();
            toggleNum = 'nextNum';
            nextNum = '';
        }

        toggleSign = 1;
    }

    function clear() {
        if (toggleAllClear == true) {
            firstNum = '';
            operator = '';
            nextNum = '';
            toggleNum = 'firstNum';
            toggleSign = 1;
            togglePoint = false;
            output = null;
            updateDisplay(0);
        } else {
            if (toggleNum == 'firstNum') {
                firstNum = '';
            } else {
                nextNum = '';
            }
            updateDisplay(0);
            toggleSign = 1;
            toggleAllClear = true;
            clearBtn.innerText = 'AC'
        }
    }

    function setSign() { 
        if (toggleNum == 'firstNum') {
            // if +/- is pressed immediately after equal, firstNum is output
            if (firstNum == '' && output != null) {
                firstNum = output;
            }

            // if no number is entered initially, ignore
            if (firstNum != '') {
                firstNum = parseFloat(firstNum) * -1;
                console.log('firstNum: ' + firstNum);
                updateDisplay(firstNum);
            }
        } else {
            // if no number is entered initially, ignore
            if (nextNum != '') {
                nextNum = parseFloat(nextNum) * -1;
                console.log('secondNum' + nextNum);
                updateDisplay(nextNum);
            }        
        }
    }

    function applyPercent() {
        if (toggleNum == 'firstNum') {
            if (firstNum == '' && output != null) {
                firstNum = output;
            }
            // if no number is entered initially, ignore
            if (firstNum != '') {
                operator = '%';
                operate();
            }
        } else {
            // if percent is pressed immediately after an operation
            if (nextNum == '') {
                nextNum = parseFloat(firstNum) / 100;
            }
            else {
                nextNum = parseFloat(firstNum) * parseFloat(nextNum) / 100;
            }
            updateDisplay(nextNum);
        }
    }

    clearBtn.addEventListener('click', clear);
    signBtn.addEventListener('click', setSign);
    percentBtn.addEventListener('click', applyPercent);
    divideBtn.addEventListener('click', () => setOp('/'));
    sevenBtn.addEventListener('click', () => setNum('7'));
    eightBtn.addEventListener('click', () => setNum('8'));
    nineBtn.addEventListener('click', () => setNum('9'));
    multiplyBtn.addEventListener('click', () => setOp('*'));
    fourBtn.addEventListener('click', () => setNum('4'));
    fiveBtn.addEventListener('click', () => setNum('5'));
    sixBtn.addEventListener('click', () => setNum('6'));
    minusBtn.addEventListener('click', () => setOp('-'));
    oneBtn.addEventListener('click', () => setNum('1'));
    twoBtn.addEventListener('click', () => setNum('2'));
    threeBtn.addEventListener('click', () => setNum('3'));
    plusBtn.addEventListener('click', () => setOp('+'));
    zeroBtn.addEventListener('click', () => setNum('0'));
    pointBtn.addEventListener('click', setPoint);
    equalBtn.addEventListener('click', operate);


    // keyboard functionality

    function removeTransition(e) {
        this.classList.remove('grey-active');
        this.classList.remove('dimGrey-active');
        this.classList.remove('yellow-active');
    }

    const keys = document.querySelectorAll('.square');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));

    window.addEventListener(
        "keydown",
        (event) => { 
        switch (event.code) {
            case "Delete":
                clearBtn.classList.add('grey-active');
                clear();
                break;
            case "Insert":
                signBtn.classList.add('grey-active');
                setSign();
                break;
            case "Backslash":
                percentBtn.classList.add('grey-active');
                applyPercent();
                break;
            case "NumpadDivide":
                divideBtn.classList.add('yellow-active');
                setOp('/');
                break;
            case "Numpad7":
                sevenBtn.classList.add('dimGrey-active');
                setNum('7');
                break;
            case "Numpad8":
                eightBtn.classList.add('dimGrey-active');
                setNum('8');
                break;
            case "Numpad9":
                nineBtn.classList.add('dimGrey-active');
                setNum('9');
                break;
            case "NumpadMultiply":
                multiplyBtn.classList.add('yellow-active');
                setOp('*');
                break;
            case "Numpad4":
                fourBtn.classList.add('dimGrey-active');
                setNum('4');
                break;
            case "Numpad5":
                fiveBtn.classList.add('dimGrey-active');
                setNum('5');
                break;
            case "Numpad6":
                sixBtn.classList.add('dimGrey-active');
                setNum('6');
                break;
            case "NumpadSubtract":
                minusBtn.classList.add('yellow-active');
                setOp('-');
                break;
            case "Numpad1":
                oneBtn.classList.add('dimGrey-active');
                setNum('1');
                break;
            case "Numpad2":
                twoBtn.classList.add('dimGrey-active');
                setNum('2');
                break;
            case "Numpad3":
                threeBtn.classList.add('dimGrey-active');
                setNum('3');
                break;
            case "NumpadAdd":
                plusBtn.classList.add('yellow-active');
                setOp('+');
                break;
            case "Numpad0":
                zeroBtn.classList.add('dimGrey-active');
                setNum('0');
                break;
            case "NumpadDecimal":
                pointBtn.classList.add('dimGrey-active');
                setPoint();
                break;
            case "NumpadEnter":
                equalBtn.classList.add('yellow-active');
                operate();
                break;
        }
        }
    );
}());