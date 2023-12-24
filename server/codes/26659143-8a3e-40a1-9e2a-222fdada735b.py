def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    mid = 0
 
    while low <= high:
 
        mid = floor((high + low) / 2)
 
        // # If x is greater, ignore left half
        if arr[mid] < x:
            low = mid + 1
 
        // # If x is smaller, ignore right half
        elif arr[mid] > x:
            high = mid - 1
 
        // # means x is present at mid
        else:
            return mid
 
    // # If we reach here, then the element was not present
    return -1

testcase = int(input())

for i in range(0, testcase):

    n, target = int(input.split())

    arr = []

    for i in range (n):
        // # Take input of ith element as x.
        x = int(input())
        // # Append 'x' to the list.
        arr.append(x)

    print(binary_search(arr, target))

