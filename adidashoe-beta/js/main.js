


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


let shuffleCounters = (shuffleLeft) => {

    let counters = document.querySelectorAll('#galleryCounters > span');

    let selectedIndex; 

    for(let i = 0; i < counters.length; i++) {
        if(counters[i].className === 'selected') {
            selectedIndex = i;
            counters[i].className = 'unselected';
        };
    };
    
    shuffleLeft ? selectedIndex-- : selectedIndex++;
    
    if(selectedIndex === counters.length) {
        selectedIndex = 0;
    } else if (selectedIndex < 0) {
        selectedIndex = counters.length-1;
    }

    counters[selectedIndex].className = 'selected';

}

let slidePhotos = (e) => {
    
    toggleSliderButtons()

    let classCypher;
    let shuffleLeft = false;

    if (e.currentTarget.id === 'leftSlider') {
        classCypher = {
            sliderImageB: 'sliderImageA',
            sliderImageC: 'sliderImageB', 
            sliderImageD: 'sliderImageC', 
            sliderImageE: 'sliderImageD',
            sliderImageF: 'sliderImageE',
            sliderImageA: 'sliderImageF'
        };

        shuffleLeft = true;

    } else if (e.currentTarget.id === 'rightSlider'){
        classCypher = {
            sliderImageB: 'sliderImageC', 
            sliderImageC: 'sliderImageD', 
            sliderImageD: 'sliderImageE', 
            sliderImageE: 'sliderImageF',
            sliderImageF: 'sliderImageA',
            sliderImageA: 'sliderImageB'
        };
    }

    let imageNodes = document.querySelectorAll('#gallerySlider > img');
    
    for (let i = 0; i < imageNodes.length; i++) {
        imageNodes[i].className = classCypher[imageNodes[i].className];
    }

    shuffleCounters(shuffleLeft);

    setTimeout( () => {toggleSliderButtons()}, 1500);
    };
            


let toggleSliderButtons = () => {
    document.querySelectorAll(".gallerySliderButton").forEach(item => item.disabled = !item.disabled);
}

//Video videovideoPlayer (this code is completely copied from class)
let promoVideo = () => {

    const facePlate = document.querySelector("#videoFacePlate");
    const videoSection = document.querySelector("#videoSection");
    const videoPlayer = document.querySelector('#videoPlayer');

    let hideFacePlate = () => {
        facePlate.style.display = "none";
        videoSection.style.height = "auto";
        videoPlayer.play();
    }
    
    facePlate.addEventListener("click", hideFacePlate);

    const vidPlayer = new Plyr("video",  {controls:["play", 
    "progress", "current-time", "mute", "volume", 
    "settings", "fullscreen"]});
    
}

promoVideo();


//page Scrolling 

let menuScroll = () => {

    const links = document.querySelectorAll("#navMenu ul li a");

    let scrollLink = (e) => {
        e.preventDefault();  //he prevents the jump
        let str = e.currentTarget.href; //he gets the href and saves it in the var str
        let newStr = str.split("#"); //he splits the string into array items and saves the second one 
        gsap.to(window, {duration: 1, scrollTo: {y: `#${newStr[1]}`}});
    }

    links.forEach(link => {
        link.addEventListener("click", scrollLink);
    })

}

menuScroll();


//copied exactly from class
let carHotSpots = () => {

    let hotspots = document.querySelectorAll(".Hotspot");
    let model = document.querySelector("#modelViewer");

    let loaded = () => {
        hotspots.forEach(hotspot => {
            hotspot.style.display = "inline-block"; // this makes the hotspots visible after the page has loaded.
        })
    }

    let showInfo = (e) => {
        let theOne = e.currentTarget.slot;
        let selected;
        hotspots.forEach(hotspot => {
            if (hotspot.slot === theOne) {
                selected = document.querySelector(`button[slot="${theOne}"] > div`);
                gsap.to(selected, 1, {autoAlpha: 1});
            } else {
                selected = document.querySelector(`button[slot="${hotspot.slot}"]`);
                gsap.to(selected, {scale: 0});
            }
        });
    }

    let hideInfo = (e) => {
        let theOne = e.currentTarget.slot;
        let selected;
        hotspots.forEach(hotspot => {
            if (hotspot.slot === theOne) {
                selected = document.querySelector(`button[slot="${theOne}"] > div`);
                gsap.to(selected, 1, {autoAlpha: 0});
            } else {
                selected = document.querySelector(`button[slot="${hotspot.slot}"]`);
                gsap.to(selected, {scale: 1});
            }
        });
    }

    //this adds two event listeners to each and every hotspot, 
    // one for when the mouse moves onto the hotspot and one for when it moves out

    hotspots.forEach(hotspot => {
        hotspot.addEventListener("mouseover", showInfo); 
        hotspot.addEventListener("mouseout", hideInfo);
    })

    model.addEventListener("load", loaded);

}

carHotSpots();


//this makes the left and right sliders larger and smaller when you move your mouse in and out of them 

let sliderHover = () => {

    //listens for both mouseover and mouseout events fired on gallery Slider Buttons 

    


    
    let enlargeSlider = (e) => {
        let g1 = gsap.timeline();
        g1.to(e.currentTarget, 1, {scale: 1.15, opacity: 1, duration: 0.75, ease: "power1"})
            .to(e.currentTarget, 1, {scale: 1, opacity: 0.3, duration: 1, ease: "elastic"});
    }


    document.querySelectorAll('.gallerySliderButton').forEach(item=>{
        item.addEventListener('click', enlargeSlider);        
    })
}
sliderHover();

document.querySelectorAll(".gallerySliderButton").forEach(item => item.addEventListener('click', slidePhotos));

document.querySelector('#hamburgWrapper').addEventListener("click", transformNav);
