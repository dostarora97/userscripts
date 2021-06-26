import {Video} from "./Video";

export class UI {
    protected dropdownEle: HTMLElement;

    constructor(videos: Video[]) {
        this.dropdownEle = this.createdDropdownWrapper();
        for (let video of videos) {
            let downloadEle: HTMLElement = this.createDropdownItem(video);
            this.appendItemToDropdown(this.dropdownEle, downloadEle);
        }
    }

    protected createdDropdownWrapper(): HTMLElement {
        let dropdownWrapper: HTMLElement = document.createElement("div");
        dropdownWrapper.classList.add("dropdown-wrapper");

        let dropdownBtn: HTMLElement = document.createElement("button");
        dropdownBtn.classList.add("dropdown-btn");
        dropdownBtn.innerHTML = "DA25-Download";
        dropdownWrapper.append(dropdownBtn);

        let itemListWrapper: HTMLElement = document.createElement("div");
        itemListWrapper.classList.add("item-list-wrapper");
        itemListWrapper.style.display = "none";
        dropdownWrapper.append(itemListWrapper);

        dropdownBtn.addEventListener("click", () => {
            if (itemListWrapper.style.display === "none") {
                itemListWrapper.style.display = "block";
            } else {
                if (itemListWrapper.style.display === "block" || itemListWrapper.style.display === "") {
                    itemListWrapper.style.display = "none";
                }
            }
        })

        let itemList: HTMLElement = document.createElement("ul");
        itemList.classList.add("dropdown-item-list");
        itemListWrapper.append(itemList);

        console.log("Dropdown Element created");
        return dropdownWrapper;
    }

    protected createDropdownItem(video: Video): HTMLElement {
        let dropdownItemEle: HTMLElement = document.createElement("li");
        dropdownItemEle.classList.add("dropdown-item");
        dropdownItemEle.dataset["url"] = video.url;

        dropdownItemEle.addEventListener("click", () => {
            window.open(dropdownItemEle.dataset["url"], "_blank")?.focus();
        })

        let videoTextEle: HTMLElement = document.createElement("span");
        videoTextEle.innerHTML = video.text;
        dropdownItemEle.append(videoTextEle)

        console.log(`Download Element for: ${video.text} created with url:`, video.url);
        return dropdownItemEle;
    }

    protected appendItemToDropdown(dropdownWrapper: HTMLElement, dropdownItem: HTMLElement): void {
        let dropdownItemListEle: HTMLElement | null = dropdownWrapper.querySelector("ul.dropdown-item-list");
        if (dropdownItemListEle) {
            dropdownItemListEle.append(dropdownItem);
            console.log("Download Element appended to Dropdown");
        }
    }

    protected attachDropdownWrapperToPage(dropdownWrapper: HTMLElement): void {
        console.log("Attaching Dropdown Element to Page.")
        let listEle: HTMLElement = document.createElement("li");
        listEle.append(dropdownWrapper);

        let menuList: HTMLElement | null = document.querySelector(".tabs-menu > ul");

        if (!!menuList) {
            menuList.prepend(listEle);
            console.log("Attached Dropdown Element to Video Details Element");
            console.log(menuList);
            console.log(dropdownWrapper);
            // addBootstrap();
        } else {
            console.log("Video Details Element is not present.")
            document.body.prepend(listEle);
            console.log("Attached Dropdown as first Element of Body");
            console.log(dropdownWrapper);
            // alert("window.flashvars present but '.tabs-menu > ul' is not");
        }
    }

    public attachDropdownToPage(): void {
        this.attachDropdownWrapperToPage(this.dropdownEle);
    }
}
