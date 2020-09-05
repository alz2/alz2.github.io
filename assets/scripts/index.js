// Modulate Profile Picture on click.
var normal_profile_pic = true;
let bio_img = document.getElementById("bio-pic");
bio_img.onclick = () => {
    normal_profile_pic = !normal_profile_pic;
    bio_img.src = normal_profile_pic ? "assets/images/profile.jpg" : "assets/images/profile2.jpg";
}
