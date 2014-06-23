
var num2aheui = function () {
	USING_ARRAY_SIZE = 250

	OPER_ADD = 0
	OPER_SUB = 1
	OPER_MUL = 2
	OPER_DIV = 3
	OPER_COPY = 4

	var logdata = function (num, oper) {
		this.num = num;
		this.oper = oper;
		
		this.getData = function () {
			switch (this.oper) {
				case OPER_ADD:
					return "+";
				case OPER_SUB:
					return "-";
				case OPER_MUL:
					return "*";
				case OPER_DIV:
					return "/";
				case OPER_COPY:
					return "copy";
				default:
					return this.num;
			}
		};
		
		this.getAheuiData = function () {
			switch (this.oper) {
				case OPER_ADD:
					return "다";
				case OPER_SUB:
					return "타";
				case OPER_MUL:
					return "따";
				case OPER_DIV:
					return "나";
				case OPER_COPY:
					return "빠";
				default:
					switch (this.num) {
						case 2:
							return "박"
						case 3:
							return "받"
						case 4:
							return "밤"
						case 5:
							return "발"
						case 6:
							return "밦"
						case 7:
							return "밠"
						case 8:
							return "밣"
						case 9:
							return "밟"
					}
			}
		};
	};

	var logging = function (arr) {
		if (arr == undefined) {
			this.logarr = new Array();
		} else {
			this.logarr = arr;
		}

		this.getLog = function() {
			r = ""
			for (i=0; i<this.logarr.length; i++) {
				r += this.logarr[i].getData() + " ";
			}
			return r;
		};

		this.getAheuiLog = function() {
			r = ""
			for (i=0; i<this.logarr.length; i++) {
				r += this.logarr[i].getAheuiData();
			}
			return r;
		};

		this.getLogSize = function () {
			return this.logarr.length;
		};

		this.copy = function () {
			return new logging(this.copyArr());
		};

		this.copyArr = function () {
			return this.logarr.slice(0);
		}
	};

	this.makeLog = function(i, j, num, oper) {
		if (i == j) {
			lst = this.arr[i].copyArr();
			lst.push(new logdata(0, OPER_COPY));
			lst.push(new logdata(0, oper));
			this.arr[num] = new logging(lst);
		} else {
			lst = this.arr[i].copyArr();
			lst = lst.concat(this.arr[j].copyArr());
			lst.push(new logdata(0, oper));
			this.arr[num] = new logging(lst);
		}
	}

	this.createTable = function() {
		this.arr = new Array(USING_ARRAY_SIZE);
		console.log("creating array size - " + USING_ARRAY_SIZE);

		// basic array
		this.arr[0] = new logging([new logdata(2), new logdata(2), new logdata(0, OPER_SUB)]);
		this.arr[1] = new logging([new logdata(2), new logdata(2), new logdata(0, OPER_DIV)]) ;
		this.arr[2] = new logging([new logdata(2)]) ;
		this.arr[3] = new logging([new logdata(3)]) ;
		this.arr[4] = new logging([new logdata(4)]) ;
		this.arr[5] = new logging([new logdata(5)]) ;
		this.arr[6] = new logging([new logdata(6)]) ;
		this.arr[7] = new logging([new logdata(7)]) ;
		this.arr[8] = new logging([new logdata(8)]) ;
		this.arr[9] = new logging([new logdata(9)]);

		for (i=1; i<USING_ARRAY_SIZE; i++) {
			for (j=1; j<USING_ARRAY_SIZE; j++) {
				if (this.arr[i] != undefined && this.arr[j] != undefined) {
					if (i+j < USING_ARRAY_SIZE && (this.arr[i+j] == undefined || this.arr[i+j].getLogSize() > this.arr[i].getLogSize() + this.arr[j].getLogSize() + 1)) {
						this.makeLog(i, j, i+j, OPER_ADD);
					}
					if (i-j > 0 && (this.arr[i-j] == undefined || this.arr[i-j].getLogSize() > this.arr[i].getLogSize() + this.arr[j].getLogSize() + 1)) {
						this.makeLog(i, j, i-j, OPER_SUB);
					}
					if (i*j < USING_ARRAY_SIZE && (this.arr[i*j] == undefined || this.arr[i*j].getLogSize() > this.arr[i].getLogSize() + this.arr[j].getLogSize() + 1)) {
						this.makeLog(i, j, i*j, OPER_MUL);
					}
					if (i%j == 0 && (this.arr[i/j] == undefined || this.arr[i/j].getLogSize() > this.arr[i].getLogSize() + this.arr[j].getLogSize() + 1)) {
						this.makeLog(i, j, i/j, OPER_DIV);
					}
				}
			}
		}

		console.log("array gen finished.");
	}

	this.getLog = function (num) {
		if (num < 0) {
			var rlog = this.arr[0].copy();
			rlog.logarr = rlog.logarr.concat(this.getLog(-1 * num).copyArr());
			rlog.logarr.push(new logdata(0, OPER_SUB));
			return rlog;
		}

		if (num < USING_ARRAY_SIZE) {
			return this.arr[num];
		} else {
			var val1 = parseInt(Math.sqrt(num));
			var val2 = num - val1*val1;
			var rlog = this.getLog(val1).copy();
			rlog.logarr.push(new logdata(0, OPER_COPY));
			rlog.logarr.push(new logdata(0, OPER_MUL));
			if (val2 > 0) {
				rlog.logarr = rlog.logarr.concat(this.getLog(val2).copyArr());
				rlog.logarr.push(new logdata(0, OPER_ADD));
			}

			return rlog;
		}
	}

	this.makeDiffNum = function (oldnum, newnum) {
		if (oldnum == newnum) {
			return new logging();
		} else if (oldnum < newnum) {
			rlog = this.getLog(newnum - oldnum).copy();
			rlog.logarr.push(new logdata(0, OPER_ADD));
			return rlog;
		} else {
			rlog = this.getLog(oldnum - newnum).copy();
			rlog.logarr.push(new logdata(0, OPER_SUB));
			return rlog;
		}
	}

	this.createTable();
};