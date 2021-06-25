console.log(axios)
// preload: function () {
//     this.load.html("form", "highscore.html");
// },

// let obj = {
//     name: this.user, score: this.score
//   }
//  console.log(obj);

function highscore(obj){
    axios.post('https://ironrest.herokuapp.com/bubblegamehighscore', obj).then(res => console.log(res.data))
}

function gethighscore(){
    obj.sort((a, b) => a.score - b.score)
    axios.get('https://ironrest.herokuapp.com/bubblegamehighscore').then(res => console.log(res.data))
    document.querySelector('.hs1').innerText = score;
}

// highscore(obj);
let highscore1 = document.querySelector('.hs1').innerText = 'Leanne';
let highscore2 = document.querySelector('.hs2').innerText = 'Leanne';
let highscore3 = document.querySelector('.hs3').innerText = 'Leanne';
let highscore4 = document.querySelector('.hs4').innerText = 'Leanne';
let highscore5 = document.querySelector('.hs5').innerText = 'Leanne';
