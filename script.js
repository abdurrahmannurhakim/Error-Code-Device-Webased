document.getElementById('startConverter').addEventListener('click', function() {
    const inputHex = document.getElementById('inputHex').value;
    const outputBinary = document.getElementById('outputBinary');
    const statusBits = document.getElementById('statusBits');

    const decimalValue = parseInt(inputHex, 16);
    if (isNaN(decimalValue)) {
        outputBinary.textContent = 'Invalid Input';
        statusBits.innerHTML = '';
        return;
    }

    const binaryValue = decimalToBinaryLSB(decimalValue);
    outputBinary.textContent = `Binary Output: ${binaryValue}`;
    statusBits.innerHTML = '';

    const bitsArray = binaryValue.split('');
    const deviceParameters = [
        'RTC', 'Flash Memory', 'Hardware ADC Sensor DP', 'Hardware ADC Sensor SP',
        'Hardware ADC Sensor RTD', 'Read Memory', 'Write Memory', 'Time & Date',
        'Sensor DP', 'Sensor SP', 'Sensor RTD', 'Error Calculation',
        'Modbus', 'DP Calibration', 'SP Calibration', 'RTD Calibration'
    ];

    bitsArray.forEach((bit, index) => {
        const status = selectStatus(bit, deviceParameters[index]);
        const p = document.createElement('p');
        p.className = bit === '1' ? 'status-error' : 'status-ok';
        p.innerHTML = `<span class="status-title">Bit ${index + 1} (${deviceParameters[index]}):</span> ${status} ${bit === '1' ? '<span class="status-error-symbol">⚠️</span>' : ''}`;
        statusBits.appendChild(p);
    });
});

function decimalToBinaryLSB(decimalValue) {
    let binaryValue = '';
    let decimal = decimalValue;

    while (decimal > 0) {
        const bitValue = decimal % 2;
        binaryValue = bitValue.toString() + binaryValue;
        decimal = Math.floor(decimal / 2);
    }

    while (binaryValue.length < 16) {
        binaryValue = '0' + binaryValue;
    }

    return binaryValue.split('').reverse().join('');
}

function selectStatus(inputChar, deviceName) {
    return inputChar === '1' ? `ERROR !!!, Please Check ${deviceName}` : `STATUS OKE for ${deviceName}`;
}
