# Given a number, find its corresponding Roman numeral. 

# Examples: 

# Input : 9
# Output : IX
# Input : 40
# Output : XL
# Input :  1904
# Output : MCMIV
# Following is the list of Roman symbols which include subtractive cases also:

# SYMBOL       VALUE
# I             1
# IV            4
# V             5
# IX            9
# X             10
# XL            40
# L             50
# XC            90
# C             100
# CD            400
# D             500
# CM            900 
# M             1000       
# Idea is to convert the units, tens, hundreds, and thousands of places of the given number separately. If the digit is 0, then there’s no corresponding Roman numeral symbol. The conversion of digit’s 4’s and 9’s are little bit different from other digits because these digits follow subtractive notation.

map = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
}

input = 751
output = ''

while(input > 0):
    if(input >= 1000):
        output += 'M'
        input -= 1000
    elif(input >= 900 and input < 1000):
        output += 'CM'
        input -= 900
    elif( input >= 500 and input < 900):
        output += 'D'
        input -= 500
    elif( input >= 400 and input < 500):
        output += 'CD'
        input -= 400
    elif( input >= 100 and input < 400):
        output += 'C'
        input -= 100
    elif( input >= 90 and input < 100):
        output += 'XC'
        input -= 90
    elif( input >= 50 and input < 90):
        output += 'L'
        input -= 50
    elif( input >= 40 and input < 50):
        output += 'XL'
        input -= 40
    elif( input >= 10 and input < 40):
        output += 'X'
        input -= 10
    elif( input >= 9 and input < 10):
        output += 'IX'
        input -= 9
    elif( input >= 5 and input < 9):
        output += 'V'
        input -= 5
    elif( input >= 4 and input < 5):
        output += 'IV'
        input -= 4
    elif( input >= 1 and input < 4):
        output += 'I'
        input -= 1

print(output, input)

    

