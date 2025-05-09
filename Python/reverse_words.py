input = "...i.like.this.program...very.much."

splitArray = [word for word in input.split('.') if word]

print("splitArray", splitArray)

output = ""

# for x in splitArray:
#     if(x):
#         output += x + '.'

output = '.'.join(splitArray)

print("output", output)