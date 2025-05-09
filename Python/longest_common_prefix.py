# Given an array of strings arr[], the task is to return the longest common prefix among each and every strings present in the array. If there’s no prefix common in all the strings, return “”.

# Examples:

# Input: arr[] = [“geeksforgeeks”, “geeks”, “geek”, “geezer”]
# Output: “gee”
# Explanation: “gee” is the longest common prefix in all the given strings: “geeksforgeeks”, “geeks”, “geeks” and “geezer”.

# Input: arr[] = [“apple”, “ape”, “april”]
# Output : “ap”
# Explanation: “ap” is the longest common prefix in all the given strings: “apple”, “ape” and “april”.

# Input: arr[] = [“hello”, “world”]
# Output: “”
# Explanation: There’s no common prefix in the given strings.

def commonPrefixLength(str1, str2):

    length = 0
    minlength = min(len(str1), len(str2))

    while length < minlength and str1[length] == str2[length]: 
        length += 1
    
    return length


def findLongestCommonPrefix(arr):

    res= arr[0]

    for i in range(1, len(arr)):
        minLength = commonPrefixLength(res, arr[i])
        res = res[:minLength]

    return res

array = ["geeksforgeeks", "geeks", "geek", "geezer"]
print(findLongestCommonPrefix(array))


