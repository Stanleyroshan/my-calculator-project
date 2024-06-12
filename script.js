document.addEventListener('DOMContentLoaded', (event) => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');
    const historyContainer = document.getElementById('history-container');
    let history = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.textContent);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key.match(/[0-9\+\-\*\/=]|Enter|Backspace|Escape/)) {
            handleInput(key);
        }
    });

    function handleInput(input) {
        let currentValue = display.value;
        if (input === 'C' || input === 'Escape') {
            display.value = '';
        } else if (input === 'x' || input === 'Backspace') {
            display.value = currentValue.slice(0, -1);
        } else if (input === '=' || input === 'Enter') {
            try {
                const result = eval(currentValue);
                display.value = result === Infinity ? 'Cannot divide by zero' : result;
                history.push(currentValue + ' = ' + display.value);
                updateHistory();
            } catch (e) {
                display.value = 'Error';
            }
        } else if (input.match(/[0-9\+\-\*\/]/)) {
            display.value = currentValue + input;
        }
    }

    function updateHistory() {
        historyContainer.innerHTML = '<h3>History</h3>';
        history.forEach(entry => {
            const p = document.createElement('p');
            p.textContent = entry;
            historyContainer.appendChild(p);
        });
    }
});
