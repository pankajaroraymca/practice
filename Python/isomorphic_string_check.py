# Two strings s1 and s2 are called isomorphic if there is a one-to-one mapping possible for every character of s1 to every character of s2. And all occurrences of every character in ‘s1’ map to the same character in ‘s2’.

# Examples: 

# Input:  s1 = “aab”, s2 = “xxy”
# Output: True
# Explanation: ‘a’ is mapped to ‘x’ and ‘b’ is mapped to ‘y’.


# Input:  s1 = “aab”, s2 = “xyz”
# Output: False
# Explanation: One occurrence of ‘a’ in s1 has ‘x’ in s2 and other occurrence of ‘a’ has ‘y’.

def check_isomorphic():
    s1 = "aab"
    s2 = "xyz"

    l1 = len(s1)
    l2 = len(s2)

    if(l1!=l2):
        return False

    map = {}

    for i in range(l1):
        char1 = s1[i]
        char2 = s2[i]
        if(map.get(char1) and map.get(char1) != char2 ):
            return False
        else:
            map[char1] = char2

    return True

print("output is ", check_isomorphic())