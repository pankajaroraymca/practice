# Given a list of words followed by two words, the task is to find the minimum distance between the given two words in the list of words.

# Examples:

# Input: S = { “the”, “quick”, “brown”, “fox”, “quick”}, word1 = “the”, word2 = “fox”
# Output: 3
# Explanation: Minimum distance between the words “the” and “fox” is 3


# Input: S = {“geeks”, “for”, “geeks”, “contribute”,  “practice”}, word1 = “geeks”, word2 = “practice”
# Output: 2
# Explanation: Minimum distance between the words “geeks” and “practice” is 2

word1 = 'geeks'
word2 = 'practice'
# array = ['the', 'quick', 'brown', 'fox', 'quick']
array = ['geeks', 'for', 'geeks', 'contribute', 'practice']
word1Index = -1
word2Index = -1
ans = 1000

for i in range(len(array)):
    if(array[i] == word1):
        word1Index = i
    elif( array[i] == word2):
        word2Index = i

    if(word1Index >= 0 and word2Index >= 0):
        ans  = abs(min(ans, (word1Index - word2Index)))

print("ans", ans)

