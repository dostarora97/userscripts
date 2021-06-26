import {KVS} from "./KVS";
import {UI} from "./UI";

interface WindowWithFlashVars extends Window {
    flashvars?: any
}

export class PN {
    protected window: WindowWithFlashVars;

    constructor(window: WindowWithFlashVars) {
        this.window = window
    }

    public init(): void {
        console.log("Inside Init Function");
        if (this.window.flashvars) {
            console.log("Flashvars are available");
            let kvs: KVS = new KVS(this.window.flashvars);
            let ui: UI = new UI(kvs.videos);
            ui.attachDropdownToPage();
        } else {
            console.log("Flashvars are not available");
        }
    }
}
