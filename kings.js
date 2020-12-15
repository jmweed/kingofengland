function processYear(year) {
	if (year == 1066) {
		
	}

	const kings = require('./kingdata.js').names;

	let resultKings = "";

	for (let i = 0; i < kings.length; i++) {
		let testKing = kings[i];
		if (year >= testKing.start && year <= testKing.end) {
			if (resultKings)	{
				resultKings = resultKings.concat(', ' + testKing.name)
			}
			else {resultKings = testKing.name}
		}
	}

	return resultKings;
}

exports.getKing = year => {
	console.log("Getting king for year: " + year);

	let king = {
		reqYear: year,
		disclaimer: "",
		name: ""
	}

	year = parseInt(year);

	if (year <= 885)	{
		king.disclaimer = "Not the King of England! The Kingdom of England didn't exist until around 886.";
	}
	else if (year > 2020) {
		king.disclaimer = "Who knows!";
	}
	else if (year > 1649 && year <= 1660) {
		king.disclaimer = 'During the English Civil War from 1649 to 1660, the Kingdom of England was in "Interregnum"';
	}
	else {
		king.name = processYear(year);
		if (!king.name) {
			king.disclaimer = "That's not a valid numerical year!"
		}
	}
	return king;
} 