from math import floor

def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    mid = 0
 
    while low <= high:
 
        mid = floor((high + low) / 2)
 
        if arr[mid] < x:
            low = mid + 1
 
        elif arr[mid] > x:
            high = mid - 1
 
        else:
            return mid
 
    return -1

testcase = int(input())

for i in range(0, testcase):

    n = int(input())
    target = int(input())
    arr = []

    for i in range (n):
        x = int(input())
        arr.append(x)

    print(binary_search(arr, target))

