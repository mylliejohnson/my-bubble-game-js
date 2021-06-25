
// let obj = {
//     name: String,
//     score: Number,
//   }
//  console.log(obj);

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('name');
console.log(myParam)

function highscore(obj){
    console.log(obj)
    obj.name = myParam
    axios.post('https://ironrest.herokuapp.com/bubblegamescore', obj).then(res => console.log(res.data))
}

async function gethighscore(){
    // obj.sort((a, b) => a.score - b.score)
    let res = await axios.get('https://ironrest.herokuapp.com/bubblegamescore')
    return res.data
}

