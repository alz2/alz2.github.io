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
let ghButton = document.getElementById("gh-btn");
console.log(ghButton);
ghButton.onclick = () => { window.open('https://www.github.com/alz2', '_blank') };
