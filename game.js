var level1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 2, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 2, 1, 0, 0, 0, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var root = document.getElementById("root");
var hero = {
    x: 64,
    y: 64,
    rupeeCount: 0
};
var rupeeSound = new Audio("assets/sound_effects/OOT_Get_Rupee.wav");
var heroDiv = document.getElementById("hero");
var rupeeCount = document.getElementById("count");

function render() {
    var output = "<div>";
    for(var i=0; i<level1.length; i++) {
        output += "<div class='row'>"
        for(var j=0; j<level1[i].length; j++) {
            // wall
            if(level1[i][j] === 1) {
                output += "<div class='wall'></div>";
            // empty tile
            } else if(level1[i][j] === 0) {
                output += "<div class='empty'></div>";
            } else if(level1[i][j] === 2) {
                output += "<div class='rupee'></div>";
            }
        }
        output += "</div>";
    }
    root.innerHTML = output + "</div>";
}
render();


document.onkeydown = function(event) {
    console.log(event.key);
    var previousPos = {
        x: hero.x,
        y: hero.y
    };
    if(event.key === "ArrowDown") {
        hero.y += 64;
    }
    if(event.key === "ArrowUp") {
        hero.y -= 64;
    }
    if(event.key === "ArrowLeft") {
        hero.x -= 64;
    }
    if(event.key === "ArrowRight") {
        hero.x += 64;
    }
    if(level1[hero.y/64][hero.x/64] === 2) {
        hero.rupeeCount++;
        rupeeCount.innerText = "rupees: " + hero.rupeeCount;
        rupeeSound.play();
        level1[hero.y/64][hero.x/64] = 0;
        render();
    }
    if(level1[hero.y/64][hero.x/64] === 1) {
        hero.x = previousPos.x;
        hero.y = previousPos.y;
    }
    console.log(hero);
    heroDiv.style.top = hero.y + "px";
    heroDiv.style.left = hero.x + "px";
}