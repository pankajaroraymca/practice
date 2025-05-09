input = "abba"

startIndex = 0
endIndx = len(input) -1
palindrome = True

while startIndex < endIndx:
    print(input[startIndex], input[endIndx])
    if(input[startIndex] != input[endIndx]):
        palindrome = False
    startIndex += 1
    endIndx -= 1
    
print("palindrome", palindrome)