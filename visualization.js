// Set up the SVG and dimensions
const width = 800;
const height = 400;
const barWidth = 20;
const barSpacing = 2;
const numBars = Math.floor(width / (barWidth + barSpacing));
const data = Array.from({ length: numBars }, () => Math.floor(Math.random() * height));

const svg = d3.select("#visualization").append("svg")
    .attr("width", width)
    .attr("height", height);

// Draw bars
function drawBars(data) {
    svg.selectAll("*").remove(); // Clear previous bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => i * (barWidth + barSpacing))
        .attr("y", d => height - d)
        .attr("width", barWidth)
        .attr("height", d => d)
        .transition()
        .duration(500);
}

// Bubble Sort algorithm
async function bubbleSort(data) {
    let len = data.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                drawBars(data);
                await new Promise(resolve => setTimeout(resolve, 100)); // Delay
            }
        }
    }
    drawBars(data);
}

// Selection Sort algorithm
async function selectionSort(data) {
    let len = data.length;
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (data[j] < data[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [data[i], data[minIdx]] = [data[minIdx], data[i]];
            drawBars(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay
        }
    }
    drawBars(data);
}

// Insertion Sort algorithm
async function insertionSort(data) {
    let len = data.length;
    for (let i = 1; i < len; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
            drawBars(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay
        }
        data[j + 1] = key;
        drawBars(data);
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay
    }
    drawBars(data);
}

// Merge Sort algorithm
async function mergeSort(data) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    async function merge(left, right) {
        let result = [], i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        result = result.concat(left.slice(i)).concat(right.slice(j));
        drawBars(result);
        await delay(100); // Delay
        return result;
    }
    
    async function sort(array) {
        if (array.length <= 1) return array;
        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);
        const sortedLeft = await sort(left);
        const sortedRight = await sort(right);
        return await merge(sortedLeft, sortedRight);
    }
    
    const sortedData = await sort(data);
    drawBars(sortedData);
}

// Quick Sort algorithm
async function quickSort(data, low = 0, high = data.length - 1) {
    if (low < high) {
        let pi = await partition(data, low, high);
        await quickSort(data, low, pi - 1);
        await quickSort(data, pi + 1, high);
    }
    drawBars(data);
}

async function partition(data, low, high) {
    let pivot = data[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (data[j] < pivot) {
            i++;
            [data[i], data[j]] = [data[j], data[i]];
            drawBars(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay
        }
    }
    [data[i + 1], data[high]] = [data[high], data[i + 1]];
    drawBars(data);
    await new Promise(resolve => setTimeout(resolve, 100)); // Delay
    return i + 1;
}

// Start sorting based on selected algorithm
async function startSorting() {
    const algorithm = document.getElementById("algorithm").value;
    const newData = Array.from(data); // Copy data
    if (algorithm === "bubble") {
        await bubbleSort(newData);
    } else if (algorithm === "selection") {
        await selectionSort(newData);
    } else if (algorithm === "insertion") {
        await insertionSort(newData);
    } else if (algorithm === "merge") {
        await mergeSort(newData);
    } else if (algorithm === "quick") {
        await quickSort(newData);
    }
}
