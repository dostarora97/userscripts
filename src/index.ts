import {PN} from "./PN";

function mainFunction() {
    let pn: PN = new PN(window);
    pn.init();
}

function docReady(userFunction: any) {
    console.log("Checking if Document is Ready");
    console.log("Adding event listener for 'DOMContentLoaded'")
    document.addEventListener("DOMContentLoaded", () => {
        console.log("'DOMContentLoaded' event caught. Now running Main Function.")
        userFunction()
    });

}

docReady(mainFunction);
