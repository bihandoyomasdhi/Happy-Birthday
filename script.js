// ==============================
// PAGE FLIP
// ==============================

const book = document.getElementById("book");

const pageFlip = new St.PageFlip(book, {
    width: 450,
    height: 620,
    size: "stretch",
    minWidth: 260,
    maxWidth: 450,
    minHeight: 360,
    maxHeight: 620,
    showCover: true,
    maxShadowOpacity: 0.5,
    mobileScrollSupport: true,
    usePortrait: true,
    startPage: 0
});

pageFlip.loadFromHTML(
    document.querySelectorAll(".page")
);


// Tentukan posisi terlebih dahulu
centerBook();



// Setelah browser selesai render, baru aktifkan animasi
window.addEventListener("load", () => {

    setTimeout(() => {
        book.classList.add("ready");
    }, 50);

});


// ==============================
// CENTER BOOK
// ==============================

function centerBook(){

    if(pageFlip.getCurrentPageIndex() === 0){
        book.classList.add("cover-mode");
        book.classList.remove("open-mode");
    }else{
        book.classList.remove("cover-mode");
        book.classList.add("open-mode");
    }

}

centerBook();

window.addEventListener("resize", centerBook);


// ==============================
// OPEN BOOK
// ==============================

const openBtn = document.getElementById("openBook");

openBtn.addEventListener("click", function(){

    pageFlip.flipNext();

});


// ==============================
// PAGE CHANGE
// ==============================

pageFlip.on("flip", function(){

    centerBook();

    const current = pageFlip.getCurrentPageIndex();

    if(current === 3){

        startFlowers();

    }

});

function centerBook(){

    const current = pageFlip.getCurrentPageIndex();
    const last = pageFlip.getPageCount() - 1;

    if(current === 0){

        // Cover depan
        book.classList.add("cover-mode");
        book.classList.remove("open-mode");
        book.classList.remove("back-cover-mode");

    }else if(current === last){

        // Cover belakang
        book.classList.remove("cover-mode");
        book.classList.remove("open-mode");
        book.classList.add("back-cover-mode");

    }else{

        // Buku terbuka
        book.classList.remove("cover-mode");
        book.classList.remove("back-cover-mode");
        book.classList.add("open-mode");

    }

}




const PIN = "0862";

let inputPin = "";

const dots = document.querySelectorAll(".dot");
const unlockBtn = document.getElementById("unlockBtn");
const deleteBtn = document.getElementById("deleteBtn");
const pinError = document.getElementById("pinError");

const lockMusic = document.getElementById("lockMusic");
const bookMusic = document.getElementById("bookMusic");

function updateDots(){

    dots.forEach((dot,index)=>{

        dot.classList.toggle("active",index<inputPin.length);

    });

}

document.querySelectorAll(".num").forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(inputPin.length>=4) return;

        if(lockMusic.paused){
            lockMusic.play().catch(()=>{});
        }

        inputPin+=btn.textContent;

        updateDots();

    });

});

deleteBtn.addEventListener("click",()=>{

    inputPin=inputPin.slice(0,-1);

    updateDots();

});

unlockBtn.addEventListener("click",checkPin);

function checkPin(){

    if(inputPin.length!==4){

        pinError.textContent="Masukkan 4 digit PIN";
        return;

    }

if(inputPin===PIN){

    lockMusic.pause();
    lockMusic.currentTime=0;

    startBalloons();
    startConfetti();

    const lockScreen=document.getElementById("lockScreen");

    lockScreen.classList.add("hide");

    setTimeout(()=>{

        lockScreen.remove();

        document.querySelector(".book-wrapper").classList.add("show");

        pageFlip.turnToPage(0);
        centerBook();

        bookMusic.currentTime=0;
        bookMusic.play().catch(()=>{});

    },500);

    }else{

        pinError.textContent="salah dong";

        setTimeout(()=>{

            inputPin="";
            updateDots();
            pinError.textContent="";

        },700);

    }

}


/*=========================
BALON
=========================*/

const balloonLayer = document.getElementById("balloonLayer");

const balloonImages = [
    "pink.png",
    "hijau.png",
    "kuning.png",
    "pinkkuning.png",
    "merah.png"
];

let balloonInterval;

function createBalloon(){

    const b=document.createElement("div");

    b.className="balloon";

    b.style.left=Math.random()*window.innerWidth+"px";

    const size=60+Math.random()*40;

    b.style.width=size+"px";
    b.style.height=size*1.35+"px";

    b.style.backgroundImage=
        `url(${balloonImages[Math.floor(Math.random()*balloonImages.length)]})`;

    // jatuh 9 - 15 detik
    b.style.animationDuration=(9+Math.random()*6)+"s";

    balloonLayer.appendChild(b);

    b.addEventListener("animationend",()=>{
        b.remove();
    });

}

function startBalloons(){

    // buat beberapa balon awal
    for(let i=0;i<8;i++){

        setTimeout(createBalloon,i*400);

    }

    // lanjut terus
    balloonInterval=setInterval(()=>{

        createBalloon();

    },800+Math.random()*500);

}


/*=========================
FLOWER
=========================*/

const flowerLayer=document.getElementById("flowerLayer");

const flowerImages=[
    "bunga1.png",
    "bunga2.png",
    "bunga3.png",
    "bunga4.png"
];

let flowerStarted = false;
let flowerInterval = null;

function createFlower(){

    const f = document.createElement("div");

    f.className = "flower";

    f.style.left = Math.random() * window.innerWidth + "px";

    const size = Math.floor(Math.random() * 50) + 20;

    f.style.width = size + "px";
    f.style.height = size + "px";

    f.style.backgroundImage =
        `url(${flowerImages[Math.floor(Math.random() * flowerImages.length)]})`;

    f.style.animationDuration =
        (8 + Math.random() * 6) + "s";

    flowerLayer.appendChild(f);

    f.addEventListener("animationend", () => {
        f.remove();
    });

}

function startFlowers(){

    // Sudah pernah dijalankan
    if(flowerStarted) return;

    flowerStarted = true;

    // Bunga awal
    for(let i=0;i<8;i++){

        setTimeout(createFlower,i*250);

    }

    // Lanjut terus
    flowerInterval = setInterval(createFlower,100);

}



/*=========================
CONFETTI
=========================*/

function startConfetti(){

    const duration = 2000; // 8 detik
    const end = Date.now() + duration;

    (function frame(){

        confetti({
            particleCount:4,
            angle:50,
            spread:300,
            origin:{
                x:0,
                y:1
            },
            startVelocity:45,
            gravity:0.3,
            scalar:1
        });

        confetti({
            particleCount:4,
            angle:130,
            spread:300,
            origin:{
                x:1,
                y:1
            },
            startVelocity:45,
            gravity:0.3,
            scalar:1
        });

        if(Date.now() < end){
            requestAnimationFrame(frame);
        }

    })();

}


const btn = document.getElementById("openMemory");
const effect = document.getElementById("tearEffect");
const photo = document.querySelector(".tear-photo");

btn.onclick = () => {

    btn.disabled = true;

    // Tombol seperti ditekan
    btn.classList.add("press");

    // Efek robekan
    setTimeout(() => {

        effect.classList.add("play");

    },150);

    // Tombol menghilang
    setTimeout(() => {

        btn.classList.add("hide");

    },450);

    // Foto muncul
    setTimeout(() => {

        photo.classList.add("show");

    },750);

};

const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

if (isMobile) {
    document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            min-height:100vh;
            background:linear-gradient(135deg,#2b1055 0%,#5f0f40 45%,#a4133c 100%);
            color:#fff;
            text-align:center;
            padding:30px;
            font-family:'Poppins',sans-serif;
            overflow:hidden;
        ">
            <div style="
                max-width:430px;
                background:rgba(255,255,255,.08);
                backdrop-filter:blur(15px);
                -webkit-backdrop-filter:blur(15px);
                border:1px solid rgba(255,255,255,.15);
                border-radius:24px;
                padding:40px 30px;
                box-shadow:0 15px 40px rgba(0,0,0,.35);
            ">
                <div style="font-size:70px;margin-bottom:18px;"></div>

                <h2 style="
                    font-size:30px;
                    font-weight:600;
                    margin-bottom:18px;
                    color:#fff;
                ">
                    Sebentar Ya...
                </h2>

                <p style="
                    font-size:17px;
                    line-height:1.9;
                    color:#f8f8f8;
                    margin-bottom:20px;
                ">
                    Ada sesuatu yang ingin kami tampilkan
                    dengan cara yang paling indah.
                    Karena itu, halaman ini hanya dapat dibuka melalui
                    <strong style="color:#FFD6E8;">browser Laptop atau Komputer</strong>.
                </p>

                <div style="
                    margin-top:28px;
                    font-size:26px;
                    letter-spacing:10px;
                ">
                </div>
            </div>
        </div>
    `;
}


// ==============================
// END
// ==============================