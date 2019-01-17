var data = `
[
  "Kazakhstan is a huge country... what goes on there?",
  "This weather is making me craaazy",
  "My neighbor sort of howls at night"
]
` 

var a = JSON.parse(data.toString());

console.log(a[1]);