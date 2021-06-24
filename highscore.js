console.log(axios)

function posthighscore(obj){
    // let obj = {
    //     name: "val", score: 100
    // }
    axios.post('https://ironrest.herokuapp.com/bubblegamehighscore', obj).then(res => console.log(res.data))
}

function gethighscore(){
    axios.get('https://ironrest.herokuapp.com/bubblegamehighscore').then(res => console.log(res.data))
}