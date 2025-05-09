# Given a string of brackets, the task is to find an index k which decides the number of opening brackets is equal to the number of closing brackets. 
# The string must be consists of only opening and closing brackets i.e. ‘(‘ and ‘)’.

# An equal point is an index such that the number of opening brackets before it is equal to the number of closing brackets from and after.

# Examples:  


# Input: str = “(())))(“
# Output:   4
# Explanation: After index 4, string splits into (()) and ))(. The number of opening brackets in the first part is equal to the number of closing brackets in the second part.


# Input: str = “))”
# Output: 2
# Explanation: As after 2nd position i.e. )) and “empty” string will be split into these two parts. So, in this number of opening brackets i.e. 0 in the first part is equal to the number of closing brackets in the second part i.e. also 0.


input = "))))))("

def findIndex(str): 
    cnt_close = 0
    cnt_open = 0
    l = len(str) 
    for i in range(0, l): 
        if(str[i] == ')'): 
            cnt_close = cnt_close + 1
  
    for i in range(0, l): 
        if(str[i] == '('):
            cnt_open += 1

        if(cnt_open == cnt_close - ((i+1) - cnt_open)):
            return i+1
    # If no opening brackets 
    return l 
  
  
# Driver Code 
str = "(()))(()()())))"
print(findIndex(str)) 