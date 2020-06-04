import string
from random import choice 

chars = string.ascii_uppercase + string.digits
count = 500
keys = []
def generator(count):
	for i in range(1,count+1):
		key = ""
		for j in range(1,4):
			for i in range(5):
				key += choice(chars)
		
			key+="-"
		keys.append(key[:-1])
generator(count)
print(keys)
