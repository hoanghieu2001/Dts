import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomArray: [],
      sortedArrays: [],
      sortAlgorithms: ['Bubble Sort (sắp xếp nổi bọt)', 'Selection Sort (sắp xếp chọn)', 'Insertion Sort (sắp xếp chèn)', 'Merge Sort (sắp xếp trọn)', 'Quick Sort'],
    };
  }

  generateRandomArray = () => {
    const randomArray = [];
    const arrayLength = Math.floor(Math.random() * 1000) + 1; // Sửa lỗi vòng lặp điều kiện cố định
    for (let i = 0; i < arrayLength; i++) {
      const randomLength = Math.floor(Math.random() * 5) + 1;
      let randomString = '';
      for (let j = 0; j < randomLength; j++) {
        const randomCharCode = Math.floor(Math.random() * 26) + 97;
        randomString += String.fromCharCode(randomCharCode);
      }
      randomArray.push(randomString);
    }
    this.setState({ randomArray, sortedArrays: [] }); // Đặt sortedArrays về rỗng sau khi tạo lại mảng
  };

  bubbleSort = (arr) => {
    console.time('Bubble Sort');
    const n = arr.length;
    let swapped;

    do {
      swapped = false;

      for (let i = 0; i < n - 1; i++) {
        // So sánh cặp phần tử liền kề và hoán đổi nếu cần
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    console.timeEnd('Bubble Sort');
    return arr;
  };

  selectionSort = (arr) => {
    console.time('Selection Sort')
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      // Tìm phần tử nhỏ nhất trong phần còn lại của mảng
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của phần chưa được sắp xếp
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    console.timeEnd('Selection Sort');
    return arr;
  };

  insertionSort = (arr) => {
    console.time("Insertion Sort");
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const currentElement = arr[i];
      let j = i - 1;

      // Di chuyển các phần tử lớn hơn currentElement sang phía phải
      while (j >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j];
        j--;
      }

      // Chèn currentElement vào vị trí thích hợp
      arr[j + 1] = currentElement;
    }
    console.timeEnd('Insertion Sort');
    return arr;
  };


  mergeSort = (arr) => {
    console.time('Merge Sort');
    if (arr.length <= 1) {
      console.timeEnd('Merge Sort'); // Kết thúc đo thời gian sau khi kiểm tra điều kiện dừng
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const mergedArray = this.merge(
      this.mergeSort(left),
      this.mergeSort(right)
    );


    return mergedArray;
  };

  merge = (left, right) => {
    console.time('Merge Sort');
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    console.timeEnd('Merge Sort');
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };



  quickSort = (arr) => {
    console.time('Quick Sort'); // Bắt đầu đo thời gian cho Quick Sort
    if (arr.length <= 1) {
      console.timeEnd('Quick Sort'); // Kết thúc đo thời gian sau khi kiểm tra điều kiện dừng
      return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    console.timeEnd('Quick Sort');
    // Kết thúc đo thời gian sau khi sắp xếp hoàn toàn
    return [
      ...this.quickSort(left),
      pivot,
      ...this.quickSort(right),
    ];
  };




  sortArray = () => {
    const { randomArray } = this.state;
    const sortedArrays = [
      this.bubbleSort([...randomArray]),
      this.selectionSort([...randomArray]),
      this.insertionSort([...randomArray]),
      this.mergeSort([...randomArray]),
      this.quickSort([...randomArray]),
    ];
    this.setState({ sortedArrays });
  };

  render() {
    const { randomArray, sortAlgorithms, sortedArrays } = this.state;
    return (
      <div className="App">
        <h1>Ứng dụng tạo và sắp xếp mảng</h1>
        <button className='btn btn-primary' style={{ marginRight: '2px' }} onClick={this.generateRandomArray}>Tạo Mảng Ngẫu Nhiên</button>
        <button className='btn btn-primary' onClick={this.sortArray}>Sắp xếp Mảng</button>
        <div>
          <h2>Mảng Ngẫu Nhiên:</h2>
          <ul>
            {randomArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Kết Quả Sắp Xếp:</h2>
          {sortAlgorithms.map((algorithm, index) => (
            <div key={index}>
              <h3>{algorithm}</h3>
              <ul>
                {sortedArrays[index]?.map((item, i) => (
                  // Kiểm tra trước khi lặp qua sortedArrays
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
