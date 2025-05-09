array = [7,6,4,3,1]

maxArray = [0] * len(array)
maxElement = array[len(array)-1]
maxProfit = 0

for i in range(len(array)-1, -1, -1):

    if(array[i] >= maxElement):
        maxArray[i] = array[i]
        maxElement = array[i]
    else:
        maxArray[i] = maxElement

for i in range(len(array)):
    if(maxArray[i] - array[i] > maxProfit):
        maxProfit = maxArray[i] - array[i]


print("max array", maxArray)
print("profit", maxProfit)


    
