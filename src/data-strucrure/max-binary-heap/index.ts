type TSelector<T> = (val: T) => string | number | boolean | T;

function defaultSelector<T>(val: T) {
    return val;
}

class MaxBinaryHeap<T> {
    public values: T[] = [];
    private selector: TSelector<T>;

    constructor(selector?: TSelector<T>) {
        this.selector = selector || defaultSelector;
    }

    private swap(index1: number, index2: number){
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
    }

    private bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.values[parentIndex];

            if (this.selector(element) <= this.selector(parent)) break;

            this.swap(parentIndex, index);
            index = parentIndex;
        }
        return this;
    }

    private bubbleDown() {
        let index = 0;
        while (index < this.values.length) {
            const root = {
                value: this.selector(this.values[index]),
                index,
            };

            const left = {
                value: this.values[2 * index + 1] ? this.selector(this.values[2 * index + 1]) : 0,
                index: 2 * index + 1,
            };

            const right = {
                value: this.values[2 * index + 2] ? this.selector(this.values[2 * index + 2]) : 0,
                index: 2 * index + 2,
            };
            if (left.value > root.value && right.value > root.value) {
                const largest = left.value > right.value ? left : right;
                this.swap(index, largest.index);
                index = largest.index;
            } else if (left.value > root.value) {
                this.swap(index, left.index);
                index = left.index;
            } else if (right.value > root.value) {
                this.swap(index, right.index);
                index = right.index;
            } else {
                break;
            }
        }
    }

    insert(val: T) {
        this.values.push(val);
        this.bubbleUp();
    }

    extractMax() {
        this.swap(0, this.values.length - 1);
        const removedValue = this.values.pop();
        this.bubbleDown();
        return removedValue;
    }
}

export default MaxBinaryHeap;
