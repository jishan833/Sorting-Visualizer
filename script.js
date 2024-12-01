let array = [];

function generateArray() 
{
    const arrayInput = document.getElementById('arrayInput').value;
    array = arrayInput.split(',').map(Number);
    visualizeArray(array);
}

function visualizeArray(arr) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = ''; 
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 10}px`; 
        bar.style.position = 'relative'; 
        bar.style.color = 'white'; 
        bar.style.fontSize = '15px'; 
        bar.style.textAlign = 'center'; 
        
        const number = document.createElement('div');
        number.innerText = value;
        number.style.position = 'absolute';
        number.style.bottom = '1'; 
        number.style.width = '100%';
        
        bar.appendChild(number); 
        container.appendChild(bar);
    });
}


async function bubbleSort() {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swapAndVisualize(j, j + 1);
            }
        }
    }
}

async function insertionSort() {
    let len = array.length;
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            await sleep(50);
            visualizeArray(array);
        }
        array[j + 1] = key;
        await sleep(50);
        visualizeArray(array);
    }
}

async function mergeSortWrapper() {
    array = await mergeSort(array);
}

async function mergeSort(arr) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));

    return await merge(left, right);
}

async function merge(left, right) {
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
    await sleep(100);
    visualizeArray(array);
    return result;
}

async function quickSortWrapper() {
    await quickSort(array, 0, array.length - 1);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swapAndVisualize(i, j);
        }
    }

    await swapAndVisualize(i + 1, high);
    return i + 1;
}

async function swapAndVisualize(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    await sleep(100);
    visualizeArray(array);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
