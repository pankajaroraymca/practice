s = "aabbccc"

freq = [0] * 26

for c in s:
    freq[ord(c) - ord('a')] += 1

firstNonRepeating = '$'

for element in range(len(freq)):
    if(freq[element] == 1):
        firstNonRepeating = chr(ord('a') + element)
        break

print("output is", firstNonRepeating)
        
