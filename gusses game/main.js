// setting game name
let gamename = "guess the word";
document.title = gamename;
document.querySelector("h1").innerHTML = gamename;
document.querySelector("footer").innerHTML = `${gamename} game created by shreif abdullah`;

let numoftries = 6;
let numofletters = 6;
let currenttry = 1;

function generateInput() {
    const inputscontainer = document.querySelector(".inputs");

    // create main try div
    for (let i = 1; i <= numoftries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // create inputs
        for (let j = 1; j <= numofletters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputscontainer.appendChild(tryDiv);
    }
    inputscontainer.children[0].children[1].focus();

    // disable all inputs accept first one
    const inputsindisable = document.querySelectorAll(".disabled-inputs input");
    inputsindisable.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        // convert to uppercase 
        input.addEventListener("input", function() {
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextinput = inputs[index + 1];
            if (nextinput) nextinput.focus();
        });
        input.addEventListener("keydown", function (event) {
            const currentindex = Array.from(inputs).indexOf(event.target);
            // console.log(currentindex);
            if (event.key === "ArrowRight") {
                const nextinput = currentindex + 1;
                if (nextinput < inputs.length) inputs[nextinput].focus();
            }
            if (event.key === "ArrowLeft") {
                const previnput = currentindex - 1;
                if (previnput >= 0) inputs[previnput].focus();
            }
        })
    });
}
window.onload = function () {
    generateInput();
};
