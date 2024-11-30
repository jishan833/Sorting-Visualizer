let array = [];

// Generates the array from user input and visualizes it
function generateArray() {
    const arrayInput = document.getElementById('arrayInput').value;
    try {
        array = arrayInput.split(',').map(Number);
        if (array.some(isNaN)) throw new Error('Invalid input: Please enter only numbers separated by commas.');
        visualizeArray(array);
    } catch (error) {
        alert(error.message);
        array = [];
        document.getElementById('arrayContainer').innerHTML = '';
    }
}

// Visualizes the array
function visualizeArray(arr) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    const barColor = document.getElementById('barColorSelect').value;

    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 200}px`;
        bar.style.width = '100px';
        bar.style.backgroundColor = barColor;
        bar.style.margin = '0 2px';
        bar.style.display = 'inline-block';
        bar.style.position = 'relative';

        const label = document.createElement('span');
        label.innerText = value;
        label.style.position = 'absolute';
        label.style.bottom = '0';
        label.style.width = '100%';
        label.style.textAlign = 'center';
        label.style.color = 'white';
        label.style.fontSize = '50px';

        bar.appendChild(label);
        container.appendChild(bar);
    });
}

// Sleep function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    const speed = parseInt(document.getElementById('speedSelect').value);
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await sleep(speed);
                visualizeArray(array);
            }
        }
    }
}

// Insertion Sort
async function insertionSort() {
    const speed = parseInt(document.getElementById('speedSelect').value);
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            await sleep(speed);
            visualizeArray(array);
        }
        array[j + 1] = key;
        await sleep(speed);
        visualizeArray(array);
    }
}

// Merge Sort Wrapper
async function mergeSortWrapper() {
    array = await mergeSort(array);
}

// Merge Sort
async function mergeSort(arr) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));

    return await merge(left, right);
}

// Merge Helper Function
async function merge(left, right) {
    const speed = parseInt(document.getElementById('speedSelect').value);
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    result = result.concat(left.slice(i)).concat(right.slice(j));
    array = result;
    await sleep(speed);
    visualizeArray(array);
    return result;
}

// Quick Sort Wrapper
async function quickSortWrapper() {
    await quickSort(array, 0, array.length - 1);
}

// Quick Sort
async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

// Partition Helper Function for Quick Sort
async function partition(arr, low, high) {
    const speed = parseInt(document.getElementById('speedSelect').value);
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await sleep(speed);
            visualizeArray(arr);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await sleep(speed);
    visualizeArray(arr);
    return i + 1;
}

// Start Sorting
function StartSort() {
    const algorithm = document.getElementById('AlgorithmSelect').value;
    if (typeof window[algorithm] === 'function') {
        window[algorithm]();
    } else {
        alert('Invalid sorting algorithm selected.');
    }
}
