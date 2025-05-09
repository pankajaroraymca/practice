# Given two strings of lowercase alphabets and a value k, the task is to find if two strings are K-anagrams of each other or not.

# Note: Two strings are called k-anagrams if the following two conditions are true. 

# Both have same number of characters.
# Two strings can become anagram by changing at most k characters in a string.
# Examples :  

# Input: str1 = “anagram” , str2 = “grammar” , k = 3
# Output: Yes
# Explanation: We can update maximum 3 values and it can be done in changing only ‘r’ to ‘n’ and ‘m’ to ‘a’ in str2.


# Input: str1 = “geeks”, str2 = “eggkf”, k = 1
# Output: No
# Explanation: We can update or modify only 1 value but there is a need of modifying 2 characters. i.e. g and f in str 2.

s1 = "anagram"
s2 = "grammar"
k = 1

def anagram(s1,s2,k):

    array = [0]*26

    len1 = len(s1)
    count = len1

    for i in range(len1):
        if(array[ord(s1[i]) - 97]):
            array[ord(s1[i]) - 97] += 1
        else:
            array[ord(s1[i]) - 97] = 1
    

    for i in range(len1):
        if(array[ord(s2[i]) - 97]):
            array[ord(s2[i]) - 97] -= 1
            count -= 1

    
    if(count <= k):
        return True
    else:
        return False

print("output", anagram(s1,s2,k))