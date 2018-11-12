//this is the script for lab3 front end



var request = new Request('https://example.com/api/bears', {
method: 'POST',
body: {'name': 'Klaus'},
headers: new Headers({
'Content-Type': 'application/json'
})
});
// Now use it!
fetch(request)
.then(resp => {
// handle response
})
.catch(err => {
// handle errors
});
