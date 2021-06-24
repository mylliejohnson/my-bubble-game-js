console.log(axios)
// let obj = {
    //   name: "val", score: 100
    // }
function highscore(obj){
    finalScore = []
    for (let each of allScores)
    if (lives.length == 0){
        allScores.push(score);
      }
    axios.post('https://ironrest.herokuapp.com/bubblegamehighscore', obj).then(res => console.log(res.data))
}

function gethighscore(){
    // allScores.sort((a, b) => a.score - b.score)
    axios.get('https://ironrest.herokuapp.com/bubblegamehighscore').then(res => console.log(res.data))
}

