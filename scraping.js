const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const totalWords = require("./words.json");

module.exports = axios;
module.exports = cheerio;

let words = [];
let translatedWords = [];


const getPostTitles = async () => {
	try {
		const { data } = await axios.get('https://ingilizce-kursu.gen.tr/blog/ingilizcede-en-cok-kullanilan-1000-kelime/');
		const $ = cheerio.load(data);
		let postTitles = [];
		let wordCounter = 2;
		let translateCounter = 1;
		
		$('td').each((_idx, el) => {
			let postTitle = $(el).text()
			postTitles.push(postTitle)
			wordCounter++;
			translateCounter++;

			if (wordCounter == 3) {
				words.push(postTitle);
				wordCounter = 0;
			}
			if (translateCounter == 3) {
				translatedWords.push(postTitle);
				translateCounter = 0;
			}
			
		});

		return words, translatedWords;
	} catch (error) {
		throw error;
	}
};

getPostTitles().then((postTitles) => {

	for (let i = 0; i < words.length; i++) {

		let singleWord = {
			id: i,
			word: words[i],
			translate: translatedWords[i],
			learned: false
		};
		totalWords.push(singleWord);
	}

	// STEP 3: Writing to a file
	fs.writeFile("words.json", JSON.stringify(totalWords), err => {

		// Checking for errors
		if (err) throw err;

		console.log("Done writing"); // Success
		console.log(words)
		console.log(translatedWords)
	});

});

//-----------------------------------------------------------------------------
