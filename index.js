// Load about me bio
let aboutMeParagraph = document.getElementById("about-me");
fetch("/static/me.txt")
    .then(r => r.text())
    .then(d => aboutMeParagraph.textContent = d);

// bio button click
var normal = true;
let bioPic = document.getElementById("bio-pic");
bioPic.onclick = () => {
    normal = !normal;
    bioPic.src = normal ? "/images/me.jpg" : "/images/me2.jpg";
}

// link buttons
let ghUrl = 'https://www.github.com/alz2';
let ghButton = document.getElementById("gh-btn");
ghButton.onclick = () => { window.open(ghUrl, '_blank') };

let resumeUrl = 'https://drive.google.com/file/d/1fABcEKgHp-9dXZGNe8BKLDGa5c4MTJK2/view?usp=sharing';
let resumeButton = document.getElementById("resume-btn");
resumeButton.onclick = () => { window.open(resumeUrl, '_blank') }

