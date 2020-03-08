// arr用于堆排序
if (arr) {
    this.container = arr
    // 直接通过现有数组构造堆，
    for (let i = Math.floor((arr.length-1) / 2); i >= 0; i--) {
        this.shiftDown(i)
    }
}