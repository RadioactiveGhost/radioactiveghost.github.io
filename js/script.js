keyBackup = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&'()*+-,./:;<>?@[]^_{|}~";
document.getElementById("settings").style.display = "none";


function setKey(a) {
	switch (a) {
		case 'Base90':
			document.getElementById("key").value = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&'()*+-,./:;<>?@[]^_{|}~";
			break;
		case 'Base64':
			document.getElementById("key").value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			break;
		case 'Base36':
			document.getElementById("key").value = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
		case 'Base32':
			document.getElementById("key").value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
			break;
		default:
			break;
	}
}

function changeBase(a, b) {
	if (a == 1) {
		document.getElementById("baseI").value = b;
	}
	else {
		document.getElementById("baseO").value = b;
	}
}


function toggleSection() {
	var section = document.getElementById("settings");
	if (section.style.display === "none") {
		section.style.display = "block";
		document.getElementById("settingsButton").value = "Hide Settings";
	}
	else {
		section.style.display = "none";
		document.getElementById("settingsButton").value = "Show Settings";
	}
}

function toggleDark() {
	var body = document.body;
	body.classList.toggle("dark-mode");
}

/*input.onkeyup = function() {
	toDecimal();
}*/
function convert() {
	var input = document.getElementById("input").value;
	var output = document.getElementById("output");
	var bI = parseInt(document.getElementById("baseI").value);
	var bO = parseInt(document.getElementById("baseO").value);
	if (checkBase()) {
		if (checkInput()) {
				var decimal = toDecimal(input, bI);
				var base = toBase(decimal, bO);
				//var textOut = showBase(bO);
				//var textOut = textOut.concat(base);
				output.value = base;
		}
	}	
}

function flipBases() {	
	var bI = document.getElementById("baseI").value;
	var bO = document.getElementById("baseO").value;
	document.getElementById("baseI").value = bO;
	document.getElementById("baseO").value = bI;
}

function checkInput() {
	var input = document.getElementById("input").value;
	var bI = parseInt(document.getElementById("baseI").value);
	document.getElementById("input").classList = "input";
	document.getElementById("inputError").style.display = "none";
	key = document.getElementById("key").value;
	check = 0;
	for (i = 0; i < input.length; i++) {
		for (j = 0; j < key.length; j++) {
			if (input[i] == key[j] && j >= bI) {
				check = 1;
				break;
			}
		}
		if (check == 1) {break;}
	}
	if (check == 1) {
		document.getElementById("input").classList = "input error";
		document.getElementById("inputError").style.display = "block";
		document.getElementById("inputError").innerHTML = input[i]+" ("+j+")"+ " > Base";
		return 0;
	} else {
		return 1;
	}
}

function checkBase() {
	var bI = parseInt(document.getElementById("baseI").value);
	var bO = parseInt(document.getElementById("baseO").value);
	document.getElementById("baseO").classList = "base";
	document.getElementById("baseI").classList = "base";
	document.getElementById("iError").style.display = "none";
	document.getElementById("oError").style.display = "none";
	key = document.getElementById("key").value;
	if (bI > key.length || bO > key.length || bI < 2 || bO < 2) {
		if (bI > key.length) {
			document.getElementById("baseI").classList = "base error";
			document.getElementById("iError").style.display = "block";
			document.getElementById("iError").innerHTML = "Max "+key.length;
		}
		if (bI < 2) {
			document.getElementById("baseI").classList = "base error";
			document.getElementById("iError").style.display = "block";
			document.getElementById("iError").innerHTML = "Min 2";
		}
		if (bO > key.length) {
			document.getElementById("baseO").classList = "base error";
			document.getElementById("oError").style.display = "block";
			document.getElementById("oError").innerHTML = "Max "+key.length;
		}
		if (bO < 2) {
			document.getElementById("baseO").classList = "base error";
			document.getElementById("oError").style.display = "block";
			document.getElementById("oError").innerHTML = "Min 2";
		}
		return 0;
	} else {
		document.getElementById("baseO").classList = "base";
		document.getElementById("baseI").classList = "base";
		return 1;
	}
}

function toBase (input, b) {
	key = document.getElementById("key").value;
	var n = parseInt(input, 10), dv = "", q = 0; r = 0;
	while (n >= b) {	
		q = n/b;
		r = Math.floor(n%b);
		dv = dv.concat(key[r]);
		n = q;
	}
	dv = dv.concat(key[Math.floor(n)]);
	out = revString(dv);
	return out;
}

function toDecimal(input, b) {	
	key = document.getElementById("key").value;
	var s = input.length;
	var decimal = 0;
	for (i = 0; i < s; i++) {
		for (j = 0; j < key.length; j++) {
			if (input[i] == key[j]){
				decimal += (Math.pow(b, s-i-1))*j;
				break;
			}
		}
	}
	return decimal;
}

function revString(str) {
	var newStr = "";
	for (var i = str.length - 1; i >= 0; i-- ) {
		newStr += str[i];
	}
	return newStr;
}

function showBase (b) { // it = string to show, b is base
	var base = "";
	switch (b)	// https://www.wikiwand.com/en/List_of_numeral_systems
	{
		
	case 2:
		base = "Binary: 0b"; 
		break;
	case 3:
		base = "Ternary: "; 
		break;
	case 4:
		base = "Quaternary: "; 
		break;
	case 5:
		base = "Quinary: "; 
		break;
	case 6:
		base = "Senary: "; 
		break;
	case 7:
		base = "Septimal: "; 
		break;
	case 8:
		base = "Octal: 0o"; 
		break;
	case 9:
		base = "Nonal: "; 
		break;
	case 10:
		base = "Decimal: "; 
		break;
	case 11:
		base = "Undecimal: "; 
		break;
	case 12:
		base = "Duodecimal: "; 
		break;
	case 13:
		base = "Tredecimal: "; 
		break;
	case 14:
		base = "Quattuordecimal: "; 
		break;
	case 15:
		base = "Quindecimal: "; 
		break;
	case 16:
		base = "Hexadecimal: 0x"; 
		break;
	case 17:
		base = "Septendecimal: "; 
		break;
	case 18:
		base = "Octodecimal: "; 
		break;
	case 19:
		base = "Nonadecimal: "; 
		break;
	case 20:
		base = "Vigesimal: "; 
		break;
	case 24:
		base = "Quadravigesimal: "; 
		break;
	case 26:
		base = "Hexavigesimal: "; 
		break;
	case 27:
		base = "Septemvigesimal: "; 
		break;
	case 30:
		base = "Trigesimal: "; 
		break;
	case 32:
		base = "Duotrigesimal: 0v"; 
		break;
	case 36:
		base = "Hexatrigesimal: "; 
		break;
	case 40:
		base = "Quadragesimal: "; 
		break;
	case 50:
		base = "Quinquagesimal: "; 
		break;
	case 60:
		base = "Sexagesimal: "; 
		break;
	case 64:
		base = "Tetrasexagesimal: "; 
		break;
	case 80:
		base = "Octogesimal: "; 
		break;
	case 90:
		base = "Nonagesimal: "; 
		break;
	case 100:
		base = "Centesimal: "; 
		break;
	case 200:
		base = "Vicentesimal: "; 
		break;
	case 300:
		base = "Tricentesimal: "; 
		break;
	default:
		base = "Base "+b+": ";
		break;
	}
	return base;
}