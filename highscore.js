
// let obj = {
//     name: String,
//     score: Number,
//   }
//  console.log(obj);

function highscore(obj){
    axios.post('https://ironrest.herokuapp.com/bubblegamehighscore', obj).then(res => console.log(res.data))
}

function gethighscore(){
    // obj.sort((a, b) => a.score - b.score)
    axios.get('https://ironrest.herokuapp.com/bubblegamehighscore').then(res => console.log(res.data))
}

//highscore 
console.log(finalScore)
