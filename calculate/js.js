        const display = document.querySelector('.display');
        const buttons = document.querySelectorAll('button');
        let currentValue = '0';
        let shouldResetDisplay = false;

        buttons.forEach(button => {
            button.addEventListener('click', () => handleButton(button.textContent));
        });

        function handleButton(value) {
            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                calculateResult();
            } else {
                handleInput(value);
            }
            updateDisplay();
        }

        function handleInput(value) {
            if (shouldResetDisplay) {
                currentValue = '';
                shouldResetDisplay = false;
            }

            if (value === '×') value = '*';
            if (value === '÷') value = '/';

            if (currentValue === '0' && !isOperator(value)) {
                currentValue = value;
            } else {
                currentValue += value;
            }
        }

        function calculateResult() {
            try {
                currentValue = eval(currentValue).toString();
            } catch (error) {
                currentValue = 'خطأ';
            }
            shouldResetDisplay = true;
        }

        function resetCalculator() {
            currentValue = '0';
            shouldResetDisplay = false;
        }

        function updateDisplay() {
            display.textContent = currentValue
                .replace('*', '×')
                .replace('/', '÷');
        }

        function isOperator(value) {
            return ['+', '-', '*', '/', '(', ')'].includes(value);
        }

        document.addEventListener('keydown', (e) => {
            const key = e.key;
            const validKeys = /[0-9\+\-\*\/\(\)\.=C]|Enter|Backspace|Delete/;

            if (validKeys.test(key)) {
                e.preventDefault();
                if (key === 'Enter' || key === '=') handleButton('=');
                else if (key === 'Backspace' || key === 'Delete') handleButton('C');
                else handleButton(key);
            }
        });