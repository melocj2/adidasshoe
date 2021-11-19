let transformNav = (e) => {
    let navItemStyle = getComputedStyle(e.currentTarget.children[2]);
    if (navItemStyle.opacity == 1) {
        e.currentTarget.children[2].style = 'opacity: 0;';
        e.currentTarget.children[1].style = 'transform: rotateY(0deg) rotate(45deg); grid-row: 1/2; transition: transform 0.5s; width: 30px; background-color: #000; border: 2.5px solid #000;';
        e.currentTarget.children[3].style = 'transform: rotateY(0deg) rotate(-45deg); grid-row: 1/2; margin-top: -24px; width: 30px; transition: transform 0.5s; background-color: #000; border: 2.5px solid #000;';
        document.querySelector("#navMenu").style = 'left: 0px; transition: 0.5s ease-out;';
        document.querySelector('#hamburgWrapper').style = 'position: absolute; left: 10px; top: 50px; height: 40px;';
    }
    else {
        e.currentTarget.children[2].style = 'opacity: 1; transition: opacity 0.5s ease-out;';
        e.currentTarget.children[1].style = 'transform: rotateY(0deg) rotate(0deg); top: 10px; transition: transform 0.5s; background-color: #fff; border: 2.5 solid #fff;';
        e.currentTarget.children[3].style = 'transform: rotateY(0deg) rotate(0deg); top: 30px; transition: transform 0.5s; background-color: #fff; border: 2.5 solid #fff;';
        document.querySelector("#navMenu").style = 'left: -250px; transition: 0.5s ease-out;';
        document.querySelector('#hamburgWrapper').style = 'postion: static; margin-left: 0px; margin-top: 0px; transition: margin 0.25s; height: 40px;';
    }
}

document.querySelector('#hamburgWrapper').addEventListener("click", transformNav);


let hoverButton = (e) => {
    let element = e.currentTarget.id;
    /*gsap.to(`#${element}`, {
        rotation: 360,
        duration: 2
     })*/
} 

document.querySelector('#learnMore').addEventListener('mouseenter', hoverButton);