# Given a string S consisting of N, lower case English alphabet, it is also given that a string is encrypted by first replacing every substring of the string consisting of the same character with the concatenation of that character and the hexadecimal representation of the size of the substring and then revering the whole string, the task is to find the encrypted string. 

# Note: All Hexadecimal letters should be converted to Lowercase letters.

# Examples:


# Input: S = “aaaaaaaaaaa”
# Output: ba  
# Explanation:



# First convert the given string to “a11” i.e. write, character along with its frequency.

# Then, change “a11” to “ab” because 11 is b in hexadecimal.

# Then, finally reverse the string i.e “ba”.


# Input: S = “abc”
# Output: 1c1b1a

def decimal_to_hexadecimal(dec):
    input = dec
    temp = 0
    output = ""

    while(input > 0):

        temp = input % 16
        print("temp", temp)
        if(temp == 0):
            break

        if(temp > 0 and temp < 10):
            output += chr(48 + temp)
        elif (temp >= 10 and temp <16):
            output += chr(87 + temp)
        input = input//16

    # reverse the string
    output = output[::-1]
    return output

freq_output = ""
freq = [0] * 26

string = "abc"
for i in range(len(string)):
    char = ord(string[i])

    if(freq[char - 97] > 0):
        freq[char - 97] = freq[char -97] + 1
    else:
        freq[char -97] = 1

for i in range(26):

    count = freq[i]
    if(count> 0):
        hex = decimal_to_hexadecimal(count)
        freq_output += chr(i+97) + hex

freq_output = freq_output[::-1]

print("output", freq_output)
