input = "GeeksforGeeks"
output = ""

length = len(input)

for i in range(length -1, -1, -1):
    output += input[i]


print("output", output)