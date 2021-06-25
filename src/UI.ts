import {Video} from "./Video";

export class UI {
    protected dropdownEle: Element;

    constructor(videos: Video[]) {
        this.dropdownEle = this.createdDropdownEle();
        for (let video of videos) {
            let downloadEle: Element = this.createDownloadEle(video);
            this.appendDownloadToDropdown(this.dropdownEle, downloadEle);
        }
    }

    protected createdDropdownEle(): Element {
        let dropdownWrapper: Element = document.createElement("div");
        dropdownWrapper.classList.add("dropdown");

        let downloadBtn: Element = document.createElement("button");
        downloadBtn.classList.add("btn", "btn-dark", "btn-sm", "dropdown-toggle");
        downloadBtn.setAttribute("type", "button");
        downloadBtn.setAttribute("data-bs-toggle", "dropdown");
        downloadBtn.innerHTML = "DA25-Download";

        dropdownWrapper.append(downloadBtn);

        let btnList: Element = document.createElement("ul");
        btnList.classList.add("dropdown-menu", "btn-sm");

        dropdownWrapper.append(btnList);

        console.log("Dropdown Element created");
        return dropdownWrapper;
    }

    protected createDownloadEle(video: Video): Element {
        let altAnchorEle: Element = document.createElement("a");
        altAnchorEle.classList.add("dropdown-item", "btn-sm");
        altAnchorEle.setAttribute("href", video.url);
        altAnchorEle.innerHTML = video.text;

        console.log(`Download Element for: ${video.text} created with url:`, video.url);
        return altAnchorEle;
    }

    protected appendDownloadToDropdown(dropdownEle: Element, downloadEle: Element): void {
        let downloadBtnList: Element | null = dropdownEle.querySelector("ul.dropdown-menu");
        let listItem: Element = document.createElement("li");
        listItem.append(downloadEle);
        if (downloadBtnList) {
            downloadBtnList.append(listItem);
            console.log("Download Element appended to Dropdown");
        }
    }

    protected attachDropdownToPage(dropdownEle: Element): void {
        console.log("Attaching Dropdown Element to Page.")
        let listEle: Element = document.createElement("li");
        listEle.append(dropdownEle);

        let menuList: Element | null = document.querySelector(".tabs-menu > ul");

        if (!!menuList) {
            menuList.prepend(listEle);
            console.log("Attached Dropdown Element to Video Details Element");
            console.log(menuList);
            console.log(dropdownEle);
            // addBootstrap();
        } else {
            console.log("Video Details Element is not present.")
            document.body.prepend(listEle);
            console.log("Attached Dropdown as first Element of Body");
            console.log(dropdownEle);
            // alert("window.flashvars present but '.tabs-menu > ul' is not");
        }
    }

    public addBootstrapToPage(): void {
        let head: Element = document.getElementsByTagName("head")[0];
        let bootstrapCssScriptEle: Element = document.createElement("link");
        bootstrapCssScriptEle.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
        bootstrapCssScriptEle.setAttribute("rel", "stylesheet");
        bootstrapCssScriptEle.setAttribute("integrity", "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC");
        bootstrapCssScriptEle.setAttribute("crossorigin", "anonymous");
        head.insertAdjacentElement("beforeend", bootstrapCssScriptEle);

        let body = document.getElementsByTagName("body")[0];
        let bootstrapJsScriptEle = document.createElement("script");
        bootstrapJsScriptEle.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
        bootstrapJsScriptEle.setAttribute("integrity", "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM");
        bootstrapJsScriptEle.setAttribute("crossorigin", "anonymous");
        body.insertAdjacentElement("beforeend", bootstrapJsScriptEle);
    }

    public attachToPage(): void {
        this.attachDropdownToPage(this.dropdownEle);
    }
}
