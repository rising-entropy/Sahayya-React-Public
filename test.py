def printPairs(arr, arr_size, sum):
    s = set()
    for i in range(0, arr_size):
        temp = sum-arr[i]
        if (temp in s):
            s.add(arr[i])
    return len(list(s))

a = int(input())
s = input().split()
A = []
for i in s:
    A.append(int(i))
k = int(input())
printPairs(A, a, k)