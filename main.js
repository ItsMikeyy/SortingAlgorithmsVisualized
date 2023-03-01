let rectArray = []
let tmpArray = []

document.getElementById("run").addEventListener("click", chooseSort)

function setup() {
    createCanvas(windowWidth - 10, windowHeight - 4)
    mergeSort()
    console.log(rectArray)
    // quickSort(0, rectArray.length - 1)
}

function draw() {
    background(0)
    for(let i = 0; i < rectArray.length; i++) {
        if (rectArray[i].status == 1) {
            fill("red")
        } 
        else if (rectArray[i].status == 2) {
            fill("blue")
        }
        else {
            fill("white")
        }
        rect(rectArray[i].x,rectArray[i].y,rectArray[i].w,rectArray[i].h)
    }
   

}

async function chooseSort() {
    createArray()
    await sleep(1000)
    value = document.getElementById("type").value
    if (value === "quick-sort") {
        quickSort(0, rectArray.length - 1)
    } 
    else if (value === "selection-sort") {
        selectionSort()
    }
    else if (value === "merge-sort") {
        mergeSort()
    }
    else if (value === "bubble-sort") {
        bubbleSort()
    }
}

function createArray() {
    if (rectArray.length > 0) {
        rectArray = []
    }
    let amt = Number(document.getElementById("amount").value)
    for (let i =0; i < amt; i++) {
        value = Math.floor(Math.random() * (windowHeight - 50) + 1)
        let width = windowWidth / amt
        let height = value
        let x = (windowWidth / amt) * i
        let y = windowHeight - height -10
        rectArray.push({
            x: x,
            y: y,
            w: width,
            h: height,
            value: value,
            status: 0
        })
    }

    console.log(rectArray)
}


async function bubbleSort() {

    for(let i = 0; i < rectArray.length; i++) {
        for( let j = 0; j < rectArray.length - i - 1; j++) {
            if (rectArray[j].value > rectArray[j+1].value) {
                await swap(j,  j+1);
                rectArray[j + 1].status = 1
                await sleep(10)
                rectArray[j + 1].status = 0
                
            }
        }
    }
    console.log(rectArray)
}

async function selectionSort() {
    let j = 0
    for (let i = 0; i < rectArray.length; i ++) {
        let min = i
        for(let j = i; j < rectArray.length; j++) {
            if(rectArray[j].value < rectArray[min].value) {
                min = j
            }
        }
        rectArray[min].status = 1
        await sleep(40)
        rectArray[min].status = 0
        await swap(min,i)
    }
    console.log(rectArray)
}

async function quickSort(left,right) {

    if (left < right) {
        let partitionPos = await partition(left,right)
        await quickSort(left, partitionPos - 1)
        await quickSort(partitionPos+1, right) 
    }
}

async function partition(left, right) {
    let i = left;
    let j = right - 1;
    let pivot = rectArray[right].value
    rectArray[j].status = 1
    rectArray[i].status = 1
    rectArray[right].status = 2
    await sleep(1)


    while (i < j) {
        while (i < right && rectArray[i].value < pivot) {
            rectArray[i].status = 0
            await sleep(1)
            i++
            rectArray[i].status = 1
            await sleep(10)


        }
        while (j > left && rectArray[j].value >= pivot) {
            rectArray[j].status = 0
            await sleep(1)
            j--
            rectArray[j].status = 1
            await sleep(10)


        }
        if (i < j) {
            await sleep(1)
            await swap(i,j)
        }
    }
    if (rectArray[i].value > pivot) {
        rectArray[right].status = 0
        await sleep(10)
        await swap(i,right)
    } 
    rectArray[right].status = 0
    rectArray[i].status = 0
    rectArray[j].status = 0
    await sleep(50)

    return i
}

async function mergeSort(arr=rectArray) {
    if (arr.length > 1){
        let mid = Math.ceil(arr.length / 2) 
        let left = arr.slice(0,mid)
        let right = arr.slice(mid)
    
        await mergeSort(left)
        await mergeSort(right)
    
        await merge(arr, left,right)
    }
    console.log(arr)

}

async function merge(arr, leftArray, rightArray) {

    let i = 0
    let j = 0
    let k = 0
    let count = 0
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i].value <= rightArray[j].value) {
            tmp = arr[k]
            // await mergeSwap(i, k, leftArray, arr)
            arr[k] = leftArray[i]
            arr[k].status = 1
            await sleep(10)
            arr[k].status = 0

            await swapPos(arr,count)
            count++
            i+=1
        }
        else {
            tmp = arr[k]
            arr[k] = rightArray[j]
            arr[k].status = 1
            await sleep(10)
            arr[k].status = 0
            await swapPos(arr,count)
            count++
            j+=1
        }
        k+=1
    }

    while(i < leftArray.length) {
        tmp = arr[k]

        arr[k] = leftArray[i]
        arr[k].status = 1

        await sleep(10)
        arr[k].status = 0

        await swapPos(arr,count)
        count++
        i+=1
        k+=1
    }
    while (j < rightArray.length) {
        tmp = arr[k]

        arr[k] = rightArray[j]
        arr[k].status = 1

        await sleep(10)
        arr[k].status = 0
        await swapPos(arr,count)
        count++
        j+=1
        k+=1
    }
    
}


async function swapPos(arr, count) {
    for (let i = 0; i < count; i++) {
        for (let j = i; j < arr.length; j++){
            if (arr[i].value < arr[j].value && arr[i].x > arr[j].x) {
                let tmp = arr[i].x
                arr[i].x = arr[j].x
                arr[j].x = tmp
            }
        }
    }
}



async function swap(e1, e2) {
    tmp = rectArray[e1].y 
    rectArray[e1].y = rectArray[e2].y
    rectArray[e2].y = tmp

    tmp = rectArray[e1].h 
    rectArray[e1].h = rectArray[e2].h
    rectArray[e2].h = tmp

    tmp = rectArray[e1].value 
    rectArray[e1].value = rectArray[e2].value
    rectArray[e2].value = tmp
}

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

