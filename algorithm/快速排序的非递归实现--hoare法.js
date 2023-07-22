//快速排序的非递归实现
//霍尔排序：hoare法

function hoareSort(arr, left, right){
	let keyi = left;
	while(left<right){ //left=right时，左右指针相遇，则跳出玄幻，交换keyi和left;

		//找小于arr[keyi]的，最后把它们都排在arr[keyi]的左边
		while(left<right && arr[right]>=arr[keyi]){
			//right要先遍历，理由如下：
			//https://blog.csdn.net/qq_58325487/article/details/124302804?spm=1001.2014.3001.5501#:~:text=%E6%88%91%E4%BB%AC%E7%90%86%E8%A7%A3%E4%BA%86hoare%E7%9A%84%E6%80%9D%E8%B7%AF%EF%BC%8C%E4%BD%86%E6%98%AF%E5%9C%A8%E5%8D%95%E8%B6%9Fhoare%E6%8E%92%E5%BA%8F%E4%B8%AD%E5%BD%93key%E5%9C%A8%E5%B7%A6%E8%BE%B9%E6%97%B6%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E8%AE%A9%E5%8F%B3%E8%BE%B9%E5%85%88%E8%B5%B0%EF%BC%9F
			
			--right; 
		}
		while(left<right && arr[left]<=arr[keyi]){
			++left;
		}
		
		let tmp = arr[right];
		arr[right] = arr[left];
		arr[left] = tmp;
	}

	let tmp = arr[keyi];
	arr[keyi] = arr[left];
	arr[left] = tmp;
	return left; //也就是left=right的位置，keyi最终整个排完后arr[keyi]应该处于的位置。
}


//非递归实现，以下的做法就是用栈来模拟递归。
function quickSort(arr){
	let stack = [];
	let left = 0;
	let right = arr.length-1;
	stack.push(left, right);
	// stack.push(right);
	while(stack.length>0){
		let right = stack.pop();
		let left = stack.pop();

		let pos = hoareSort(arr, left, right);

		if(pos-1>left){
			stack.push(left, pos-1);
			// stack.push(pos-1);
		}

		if(pos+1<right){
			stack.push(pos+1, right);
			// stack.push(right);
		}
	}

	return arr;
}

let arrayToSort = [ 6, 1,10,5,6,9,4,8,2];

console.log(quickSort(arrayToSort));