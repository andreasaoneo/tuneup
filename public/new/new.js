var ready = false;
var artist = document.getElementById('artist').textContent;
var name = document.getElementById('name').textContent;

var image = document.getElementById('image');
image.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('/images/' + file.name);
});

var audio = document.getElementById('audio');
audio.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('/audio/' + file.name);
    ready = true;
});

var submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    console.log(ready);
    if (ready) {
        var postData = {
            artist: artist,
            name: name,
            audio: firebase.storage().ref('audio/' + audio.target.files[0].name),
            // starCount: 0,
            image: firebase.storage().ref('images/' + image.target.files[0].name)
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts/').push().key;

        // Write the new post's data
        var updates = {};
        updates['/posts/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);
     } //else {
    //     alert('Please upload an audio file.');
    // }
});



