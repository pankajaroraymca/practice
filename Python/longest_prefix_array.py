array = ["apple", "ape", "appl"]

def longestPrefix(array):

    if(len(array) < 1):
        return ""
    
    longestPrefix = ""
    first = array[0]

    maxlength = len(array[0])
    print("maxlength", maxlength)

    for i in range(maxlength):
        char = first[i]
         
        for j in range(1, len(array)):

            charLength = len(array[j])
            print(charLength)
            
            if i >= charLength:
                print("returning", i)
                return longestPrefix

            if char != array[j][i]:
                return longestPrefix

            print("------->", char)
        longestPrefix += char

    return longestPrefix


    

    

ans = longestPrefix(array)
print("ans", ans)