function swap<T>(arr: T[], i: number, min: number) {
	if (i !== min) {
		const cur = arr[i];
		arr[i] = arr[min];
		arr[min] = cur;
	}
}

function selectionSort<T>(arr: T[], comparator : (a: T, b: T) => number) {
	let min = 0;
	for (let i = 0; i < arr.length; i++) {
		min = i; // reset min to the current index
		for (let j = i + 1; j < arr.length; j++) {
			if (comparator(arr[j], arr[min]) < 0) {
				min = j;
			}
		}
		swap(arr, i, min);
	}
	return arr;
}

export default selectionSort;
