if (window.Worker) {
    const appForm = document.getElementById("app-form");
    appForm.addEventListener("submit", (e) => generateHashedPassword(e));

    const hashedResult = document.getElementById("hashed-result");
    const worker = new Worker(new URL("./worker.js", import.meta.url), {type: "module"});

    worker.onmessage = (e) => {
        const spinner = document.getElementById("loading-spinner");

        const username = document.getElementById("username").value;
        spinner.classList.add("hidden");

        hashedResult.innerText = `${username}:${e.data}`;

    }

    const generateHashedPassword = (e) => {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const spinner = document.getElementById("loading-spinner");
        if (window.Worker) {
            spinner.classList.remove("hidden");
            if (hashedResult.innerText !== "") {
                hashedResult.innerText = "";
            }
            worker.postMessage(password);
        }

    }


    document.getElementById("reset-form").addEventListener('click', () => {
        hashedResult.innerText = ""
    })

    let copyResultBtn = document.getElementById("copy-result");
    copyResultBtn.addEventListener('click', () => {
        if (hashedResult.innerText !== "") {
            navigator.clipboard.writeText(hashedResult.innerText).then(() => {
                copyResultBtn.classList.add('has-been-copied');
                setTimeout(() => {
                    copyResultBtn.classList.remove('has-been-copied');

                }, 100)
            })
        }
    })

}
