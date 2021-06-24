console.log(axios)

// let score = 0;

let obj = {
    name: "",
    score: 
}

let allScores = []
console.log(allScores)

let obj = {
        name: "val", score: 100
    }

function highscore(obj){
    if (lives.length === 0 && score > 0) {
        allScores.push(score);
        console.log(allScores)
      }
    axios.post('https://ironrest.herokuapp.com/bubblegamehighscore', obj).then(res => console.log(res.data))
}

function gethighscore(){
    highScores.sort((a, b) => a - b)
    axios.get('https://ironrest.herokuapp.com/bubblegamehighscore').then(res => console.log(res.data))
}