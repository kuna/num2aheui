var string2aheui = function () {
	this.processString = function (n2a, str, bord) {
		if (str.length == 0) {
			return undefined;
		}

		var nord = str.charCodeAt(0);
		console.log(nord);
		var r = "";
		if (bord == undefined) {
			r = n2a.getLog(nord).getAheuiLog();
			r += "빠맣";
		} else {
			r = n2a.makeDiffNum(bord, nord).getAheuiLog();
			r += "빠맣";
		}

		var nr = this.processString(n2a, str.substring(1), nord);
		if (nr == undefined) {
			return r;
		} else {
			return r.concat(nr);
		}
	};
};