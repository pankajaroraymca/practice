def maxSub(nums):

    if(len(nums) == 0):
        return 0

    maxSum = nums[0]
    maxPrevSum = nums[0]
    index = 0

    for i in range(1, len(nums)):
        print("num", nums[i])

        if(nums[i] > maxPrevSum + nums[i]):
            index = i
           
            maxPrevSum = nums[i]
           
        else:
            maxPrevSum+= nums[i]

        if(maxPrevSum > maxSum):
            maxSum = maxPrevSum



       

    return maxSum
                


print("maxSum", maxSub( [-2, 1, -3, 4, -1, 2, 1, -5, 4] ))
