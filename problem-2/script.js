apiURL = 'https://jsonplaceholder.typicode.com/posts'

let myMap = new Map();

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => data.forEach(post => {post.title.length > 6 && console.log(post.title)}));

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(
    data => data.forEach(post => {
      post.body.split(/\s/).forEach(word => myMap.set(word, myMap.get(word)+1 || 1))
      // post.body.forEach(word => {myMap.has(word) ? myMap[word]++ : myMap.set(word,1)})
  }));

console.log(myMap);