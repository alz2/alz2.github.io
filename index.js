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

let langDescription = document.getElementById("lang-description");

let createProgLangElement = (name) => {
    let img = document.createElement("img");
    img.className = "ui image"; // set semantic ui
    img.src = "images/icons/"+name+".png";
    return img;
}

let createSkills = (langInfo) => {
    let knowLangs = document.getElementById("knowlang-icons");
    ["python", "java"].forEach((n) => {
        let img = createProgLangElement(n);
        img.onclick = () => langDescription.textContent = langDescription.textContent.length ? "" : langInfo[n];
        knowLangs.appendChild(img);
    });

    let betterLangs = document.getElementById("betterlang-icons");
    ["cpp", "haskell", "javascript"].forEach((n) => {
        let img = createProgLangElement(n);
        img.onclick = () => langDescription.textContent = langDescription.textContent.length ? "" : langInfo[n];
        betterLangs.appendChild(img);
    });
}

fetch("/static/langinformation.json")
    .then(r => r.json())
    .then(langInfo => createSkills(langInfo));


// link buttons
let ghUrl = 'https://www.github.com/alz2';
let ghButton = document.getElementById("gh-btn");
ghButton.onclick = () => { window.open(ghUrl, '_blank') };

let resumeUrl = 'https://drive.google.com/file/d/1bmg1xnwopi6k7H5JQBNOH84-IG1Tya0b/view?usp=sharing';
let resumeButton = document.getElementById("resume-btn");
resumeButton.onclick = () => { window.open(resumeUrl, '_blank') }

