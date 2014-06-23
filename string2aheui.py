#!/usr/bin/python
#-*- coding: utf-8 -*-

import num2aheui

def processString(string, bord):
	if (len(string) == 0):
		return None

	nord = ord(string[0])
	r = ""
	if (bord == None):
		r = num2aheui.getLog(nord).getAheuiLog()
		r += u"빠맣"
	else:
		r = num2aheui.makeDiffNum(bord, nord).getAheuiLog()
		r += u"빠맣"

	nr = processString(string[1:], nord)
	if (nr == None):
		return r
	else:
		return r + nr

def main():
	num2aheui.createTable()

	while True:
		string = raw_input("please enter what you want - ").decode('utf-8')
		print processString(string, None) + u"하"

if __name__ == '__main__':
	main()