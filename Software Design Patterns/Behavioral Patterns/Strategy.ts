// Strategy interface
interface SortStrategy {
  sort(data: number[]): number[];
}

// Concrete Strategy: BubbleSort
class BubbleSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Sorting using Bubble Sort.");
    const sortedData = [...data];
    const n = sortedData.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortedData[j] > sortedData[j + 1]) {
          [sortedData[j], sortedData[j + 1]] = [sortedData[j + 1], sortedData[j]];
        }
      }
    }
    return sortedData;
  }
}

// Concrete Strategy: QuickSort
class QuickSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Sorting using Quick Sort.");
    const sortedData = [...data];
    return this.quickSort(sortedData, 0, sortedData.length - 1);
  }

  private quickSort(data: number[], low: number, high: number): number[] {
    if (low < high) {
      const pi = this.partition(data, low, high);
      this.quickSort(data, low, pi - 1);
      this.quickSort(data, pi + 1, high);
    }
    return data;
  }

  private partition(data: number[], low: number, high: number): number {
    const pivot = data[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (data[j] < pivot) {
        i++;
        [data[i], data[j]] = [data[j], data[i]];
      }
    }
    [data[i + 1], data[high]] = [data[high], data[i + 1]];
    return i + 1;
  }
}

// Concrete Strategy: MergeSort
class MergeSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Sorting using Merge Sort.");
    const sortedData = [...data];
    return this.mergeSort(sortedData);
  }

  private mergeSort(data: number[]): number[] {
    if (data.length < 2) {
      return data;
    }
    const mid = Math.floor(data.length / 2);
    const left = this.mergeSort(data.slice(0, mid));
    const right = this.mergeSort(data.slice(mid));

    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift()!);
      } else {
        result.push(right.shift()!);
      }
    }
    return result.concat(left, right);
  }
}

// Context: Sorter
class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  public sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Usage
const data = [64, 34, 25, 12, 22, 11, 90];
const bubbleSort = new BubbleSort();
const quickSort = new QuickSort();
const mergeSort = new MergeSort();

const sorter = new Sorter(bubbleSort);

console.log("Sorting with Bubble Sort:");
console.log(sorter.sort(data));
// Output: Sorting using Bubble Sort.
// [11, 12, 22, 25, 34, 64, 90]

sorter.setStrategy(quickSort);
console.log("\nSorting with Quick Sort:");
console.log(sorter.sort(data));
// Output: Sorting using Quick Sort.
// [11, 12, 22, 25, 34, 64, 90]

sorter.setStrategy(mergeSort);
console.log("\nSorting with Merge Sort:");
console.log(sorter.sort(data));
// Output: Sorting using Merge Sort.
// [11, 12, 22, 25, 34, 64, 90]
