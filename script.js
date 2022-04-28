const container = document.querySelector('.container');
const allDataWords = [];
const allDataTranslated = [];
let allDataLearned = [];
let currentLearnedData = [];
let localData = [];


fetch('words.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        div.setAttribute("class", "textBorder");
        div.setAttribute("id", i);
        allDataWords[i] = data[i].word;
        allDataTranslated[i] = data[i].translate;
        allDataLearned[i] = data[i].learned;
        div.innerHTML = allDataWords[i];
        document.getElementById("myData").appendChild(div);
    }



    localData = localStorage.getItem("learnedBox");

    if (localData == null) {
        //console.log("if'in içindeyim")

    }
    else {
        //console.log("else'in içindeyim")
        var localData = JSON.parse(localStorage.getItem("learnedBox"));
        //console.log(allDataLearned)
        //console.log(localData)
        allDataLearned = localData
    }

    getAllData()

}

container.addEventListener('click', function (e) {
    // when per select the words
    if (e.target.classList.contains('textBorder')) {
        e.target.classList.toggle('selected');
    }


    // when the words selected
    if (e.target.classList.contains('textBorder') && e.target.classList.contains('selected')) {
        alert("TURKISH : " + allDataTranslated[e.target.id]);
        restoreAllData([e.target.id])
        console.log(allDataLearned)
        saveAllData()
    }


    // when the words unselected
    if (e.target.classList.contains('textBorder') && !e.target.classList.contains('selected')) {
        restoreAllData([e.target.id])
        console.log(allDataLearned)
        saveAllData()
    }


});






function getAllData() {
    for (let i = 0; i < allDataLearned.length; i++) {
        if (allDataLearned[i] == true) {
            let list = document.getElementById(i).classList;
            list.add("selected");
        }

    }
}




//index is true or false depends learned or did not learned
function restoreAllData(index) {
    if (allDataLearned[index] == true) {
        allDataLearned[index] = false;
    }
    else {
        allDataLearned[index] = true;
    }
}


function saveAllData() {
    //localStorage.removeItem("learnedBox", allDataLearned);
    //localStorage.setItem("learnedBox", allDataLearned);
    localStorage.removeItem('learnedBox', JSON.stringify(allDataLearned));
    localStorage.setItem('learnedBox', JSON.stringify(allDataLearned));
}