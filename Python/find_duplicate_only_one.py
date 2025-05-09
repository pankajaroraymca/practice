array = [3,1,3,4,2]

def findOneDuplicate(array):

    if(len(array) <=1 ):
        return -1
    
    slow = array[0]
    fast = array[0]

    while True:
        slow = array[slow]
        fast = array[array[fast]]

        if(slow == fast):
            break
    
    fast = array[0]

    while slow != fast:
        slow = array[slow]
        fast = array[fast]

    return slow

ans = findOneDuplicate(array)
print("ans", ans)