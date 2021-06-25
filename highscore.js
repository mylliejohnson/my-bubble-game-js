console.log(axios)
// preload: function () {
//     this.load.html("form", "index.html");
// },

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


// player inputs name and store it in the obj
let sendButton = document.getElementById('send-btn');
sendButton.onclick = function() {
    let player = document.getElementsByTagName('input')[0];
    console.log(input.value);
}

$ ("button").click (function (event) {
    // $(this) will have the value of the button ($("button")) object
// because the button object invokes the click () method
    console.log ($ (this).prop ("name"));
    });