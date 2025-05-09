# Given a decimal number as input, we need to write a program to convert the given decimal number into an equivalent hexadecimal number. i.e. convert the number with base value 10 to base value 16.

# Hexadecimal numbers use 16 values to represent a number. Numbers from 0-9 are expressed by digits 0-9 and 10-15 are represented by characters from A – F.

# Examples:  

# Input : 116
# Output: 74


# Input : 10
# Output: A


# Input : 33
# Output: 21


# Algorithm:

# Store the remainder when the number is divided by 16 in a temporary variable temp. If the temp is less than 10, insert (48 + temp) in a character array otherwise if the temp is greater than or equal to 10, insert (55 + temp) in the character array.
# Divide the number by 16 now
# Repeat the above two steps until the number is not equal to 0.
# Print the array in reverse order now.
# Example

# If the given decimal number is 2545. 

# Step 1: Calculate the remainder when 2545 is divided by 16 is 1. Therefore, temp = 1. As temp is less than 10. So, arr[0] = 48 + 1 = 49 = ‘1’. 
# Step 2: Divide 2545 by 16. The new number is 2545/16 = 159. 
# Step 3: Calculate the remainder when 159 is divided by 16 is 15. Therefore, temp = 15. As temp is greater than 10. So, arr[1] = 55 + 15 = 70 = ‘F’. 
# Step 4: Divide 159 by 16. The new number is 159/16 = 9. 
# Step 5: Calculate the remainder when 9 is divided by 16 is 9. Therefore, temp = 9. As temp is less than 10. So, arr[2] = 48 + 9 = 57 = ‘9’. 
# Step 6: Divide 9 by 16. The new number is 9/16 = 0. 
# Step 7: Since the number becomes = 0. Stop repeating steps and print the array in reverse order. Therefore, the equivalent hexadecimal number is 9F1.

input = 11
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
        output += chr(55 + temp)
    input = input//16

# reverse the string
output = output[::-1]

print("output", output)


