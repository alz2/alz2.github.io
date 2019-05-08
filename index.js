// Load about me bio
let aboutMeParagraph = document.getElementById("about-me");
fetch("/static/me.txt")
    .then(r => r.text())
    .then(d => aboutMeParagraph.textContent = d);
