const app = firebase.app(); 
const database = firebase.database();

const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
    window.location.pathname = '/new';
});

function toggleLike(obj, postid) {
    if (obj.classList.contains('liked')) {
        obj.classList.remove('liked');
        obj.innerHTML = '&#xE87E;';
    } else {
        obj.classList.add('liked');
        obj.innerHTML = '&#xE87D;';
    }
}

function togglePlay(player, btn) {
    if (player.duration > 0 && !player.paused) {

        player.pause();
        btn.attributes.src = 'assets/images/play.svg';

    } else {

        player.play();
        btn.attributes.src = 'assets/images/pause.svg';

    }
}

function createPost(artist, image, name, audio) {
    document.write(`
        <div class="post">
            <div class="image" style="background-image: url('${image}');"></div>
            <div class="sub">
                <img src="assets/images/play.svg" class="playBtn" alt="play" onclick="togglePlay(this.parentElement.querySelectorAll('.audio')[0], this);">
                <i class="material-icons loveBtn" onclick="toggleLike(this);">&#xE87E;</i>
                <h2 class="songTitle"> ${name} </h2>
                <h3 class="artist"> ${artist} </h3>
                <audio class="audio" src="${audio}"></audio>
            </div>
        </div>
        `);
}

function getPosts() {
    var recentPostsRef = database.ref('/posts').limitToLast(10);
    for (i=0;i<10;i++) {
        createPost(recentPostsRef[i].artist, recentPostsRef[i].image, recentPostsRef[i].name, recentPostsRef[i].audio);
    }
}

