import random

print('heelo world')
if(5>2):
    print('greater')
    print("gretar than")

print('outer scope')

# this is a comment
x = int(3)
y = str(3)
z= float(3)
print('value of x, y,z is: ', x, y, z)
print('type of y is: ', type(y))

print(random.randint(1,100))


# -------------------- STRING -----------------------------------
string = 'Pankaj'
print(string[2], len(string))

if('P' in string):
    print('present')
else:
    print('not present')

# STRING SLICING
print(string[1:4])
print(string[:4])
print(string[1:])

print(string.lower())
print(string.replace('P', 'S'))
print(string.split('a'))
print(f"My name is {string}")

# ------------------------ARRAY----------------------------

array = ["pankaj", "shubham", "vikas"]
print(len(array))
print(array[2])
print(array[1:2])
print(array[:2])
print(array[1:])
print("present", "vikas" in array)
array.append('ram')
print("now array", array)
print("pop last item", array.pop())

for element in array:
    print('element', element)

for i in range(len(array)):
    print("index element", array[i])

print(array.sort(), array)
print(array.sort(reverse=True), array)

copyArray = list(array)
print(copyArray)

# ------------------------------SETS--------------------------------

set = { "one", "two", "three", "three"}
print("set", set) #will discard second three
set.add("four")
set.add("five")
set.remove('two')
print("set again", set)
print("two" in set)
print("five" in set)

# --------------------------------DICTIONARY------------------------------

dict = {
    "name": "Pankaj",
    "age": 25,
    "isMarried": False
}

print("dict", dict)
dict["isHero"] = True
print("dict again", dict)
print("get item", dict["name"])
dict.pop("isHero")
print("dict agaib", dict)

for element in dict:
    print("dict element", element, dict[element])