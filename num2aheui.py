#!/usr/bin/python
#-*- coding: utf-8 -*-

class FixedArray(list):
	def __init__(self, size):
		list.__init__(self)
		for i in range(0, size):
			list.append(self, None)

OPER_ADD = 0
OPER_SUB = 1
OPER_MUL = 2
OPER_DIV = 3
OPER_COPY = 4

class logdata:
	def __init__(self, num=None, oper=None):
		self.num = num
		self.oper = oper

	def getData(self):
		if (self.oper == OPER_ADD):
			return "+"
		elif (self.oper == OPER_SUB):
			return "-"
		elif (self.oper == OPER_MUL):
			return "*"
		elif (self.oper == OPER_DIV):
			return "/"
		elif (self.oper == OPER_COPY):
			return "copy"
		else:
			return str(self.num)

	def getAheuiData(self):
		if (self.oper == OPER_ADD):
			return u"다"
		elif (self.oper == OPER_SUB):
			return u"타"
		elif (self.oper == OPER_MUL):
			return u"따"
		elif (self.oper == OPER_DIV):
			return u"나"
		elif (self.oper == OPER_COPY):
			return u"빠"
		else:
			if (self.num == 2):
				return u"박"
			elif (self.num == 3):
				return u"받"
			elif (self.num == 4):
				return u"밤"
			elif (self.num == 5):
				return u"발"
			elif (self.num == 6):
				return u"밦"
			elif (self.num == 7):
				return u"밠"
			elif (self.num == 8):
				return u"밣"
			elif (self.num == 9):
				return u"밟"

class logging:
	# default log value is 0
	def __init__(self, arr=None):
		if (arr == None):
			self.logarr = []
		else:
			self.logarr = arr

	def getLog(self):
		r = ""
		for l in self.logarr:
			r += l.getData() + " "
		return r

	def getAheuiLog(self):
		r = ""
		for l in self.logarr:
			r += l.getAheuiData()
		return r

	def getLogSize(self):
		return len(self.logarr)

	def copy(self):
		cp = logging()
		cp.logarr = self.copyArr()
		return cp

	def copyArr(self):
		return list(self.logarr)

# consts
USING_ARRAY_SIZE = 250

def createTable():
	global arr
	arr = FixedArray(USING_ARRAY_SIZE)

	def makeLog(i, j, num, oper):
		if (i == j):
			lst = arr[i].copyArr()
			lst.append(logdata(0, OPER_COPY))
			lst.append(logdata(0, oper))
			arr[num] = logging(lst)
		else:
			lst = arr[i].copyArr()
			lst += arr[j].copyArr()
			lst.append(logdata(0, oper))
			arr[num] = logging(lst)

	print "creating array size - %d" % USING_ARRAY_SIZE
	# basic
	arr[0] = logging([logdata(2), logdata(2), logdata(0, OPER_SUB)])
	arr[1] = logging([logdata(2), logdata(2), logdata(0, OPER_DIV)]) 
	arr[2] = logging([logdata(2)]) 
	arr[3] = logging([logdata(3)]) 
	arr[4] = logging([logdata(4)]) 
	arr[5] = logging([logdata(5)]) 
	arr[6] = logging([logdata(6)]) 
	arr[7] = logging([logdata(7)]) 
	arr[8] = logging([logdata(8)]) 
	arr[9] = logging([logdata(9)])

	for i in range(1, USING_ARRAY_SIZE):
		for j in range(1, USING_ARRAY_SIZE):
			if (arr[i] != None and arr[j] != None):
				if (i+j < USING_ARRAY_SIZE and (arr[i+j] == None or arr[i+j].getLogSize() > arr[i].getLogSize() + arr[j].getLogSize() + 1)):
					makeLog(i, j, i+j, OPER_ADD)
				if (i-j > 0 and (arr[i-j] == None or arr[i-j].getLogSize() > arr[i].getLogSize() + arr[j].getLogSize() + 1)):
					makeLog(i, j, i-j, OPER_SUB)
				if (i*j < USING_ARRAY_SIZE and (arr[i*j] == None or arr[i*j].getLogSize() > arr[i].getLogSize() + arr[j].getLogSize() + 1)):
					makeLog(i, j, i*j, OPER_MUL)
				if (i%j == 0 and (arr[i/j] == None or arr[i/j].getLogSize() > arr[i].getLogSize() + arr[j].getLogSize() + 1)):
					makeLog(i, j, i/j, OPER_DIV)

	print "array gen finished."

def getLog(num):
	if (num < 0):
		rlog = arr[0].copy()
		rlog.logarr += getLog(-1 * num).copyArr()
		rlog.logarr.append(logdata(0, OPER_SUB))
		return rlog

	if (num < USING_ARRAY_SIZE):
		return arr[num]
	else:
		import math
		val1 = int(math.sqrt(num))
		val2 = num - val1*val1
		rlog = getLog(val1).copy()
		rlog.logarr.append(logdata(0, OPER_COPY))
		rlog.logarr.append(logdata(0, OPER_MUL))
		if (val2 > 0):
			rlog.logarr += getLog(val2).copyArr()
			rlog.logarr.append(logdata(0, OPER_ADD))

		return rlog

def makeDiffNum(oldnum, newnum):
	if (oldnum == newnum):
		return logging()
	elif (oldnum < newnum):
		rlog = getLog(newnum - oldnum).copy()
		rlog.logarr.append(logdata(0, OPER_ADD))
		return rlog
	else:
		rlog = getLog(oldnum - newnum).copy()
		rlog.logarr.append(logdata(0, OPER_SUB))
		return rlog

def main():
	createTable()

	while True:
		TARGET_NUM = int(raw_input("input number - "))
		target = getLog(TARGET_NUM)
	
		print target.getLog()
		print target.getAheuiLog()
	
if __name__ == '__main__':
	main()