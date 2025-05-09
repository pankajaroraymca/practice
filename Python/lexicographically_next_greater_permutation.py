def nextGreaterPermutation(array):

    length = len(array)
    breakPoint = -1
    for i in range(length-1, 0, -1):
        # print("element", array[i])

        if(array[i-1] < array[i]):
            breakPoint = i-1
            break

    print("break pount element", array[breakPoint])

    if(breakPoint<0):
        return array.sort()

    # find next greater number than break point
    nextGreaterThanBreakPoint = None
    index = -1
    print("here", nextGreaterThanBreakPoint)
    for i in range(breakPoint+1, length):

        if(array[i] > array[breakPoint]):
            if(nextGreaterThanBreakPoint is None or array[i] < nextGreaterThanBreakPoint):
                nextGreaterThanBreakPoint = array[i]
                index = i

# SWAP ELEMENTS
    if index > 0:
        temp = array[breakPoint]
        array[breakPoint] = array[index]
        array[index] = temp

# REVERSED FROM NEXT INDEX --> IT WILL BE ACENDING ORDER
    array[breakPoint+1:] = reversed(array[breakPoint+1:])
    return array





array = [1,7,2,9,3,1]
print("ans", nextGreaterPermutation(array))
