array = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]

def sortArray(array):

    if(len(array) <=1):
        return array
    
    start = 0
    end = len(array) - 1
    mid = 0

    while mid <= end:

        if(array[mid] == 2):
            temp = array[mid]
            array[mid] = array[end]
            array[end] = temp
            end = end - 1
        elif array[mid] == 1 :
            mid += 1
        else:
            temp = array[start]
            array[start] = array[mid]
            array[mid] = temp
            start += 1
            mid += 1


sortArray(array)
for i in range(len(array)):
    print(array[i])