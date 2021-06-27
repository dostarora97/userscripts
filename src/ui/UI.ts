import {Video} from "../Video";

export class UI {
    private dropdownEle: HTMLElement | undefined;

    private constructor() {}

    public static async createDropdown(videos: Video[]): Promise<UI> {
        const ui = new UI();
        ui.dropdownEle = UI.createdDropdownWrapper();
        for (let video of videos) {
            const downloadEle: HTMLElement = await UI.createDropdownItem(video);
            UI.appendItemToDropdown(ui.dropdownEle, downloadEle);
        }
        await import('./styles.css');
        return ui;
    };

    private static createdDropdownWrapper(): HTMLElement {
        const dropdownWrapper: HTMLElement = document.createElement("div");
        dropdownWrapper.classList.add("dropdown-wrapper");

        const dropdownBtn: HTMLElement = document.createElement("button");
        dropdownBtn.classList.add("dropdown-btn");
        dropdownBtn.innerHTML = "DA25-Download";
        dropdownWrapper.append(dropdownBtn);

        const itemListWrapper: HTMLElement = document.createElement("div");
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

        const itemList: HTMLElement = document.createElement("ul");
        itemList.classList.add("dropdown-item-list");
        itemListWrapper.append(itemList);

        console.log("Dropdown Element created");
        return dropdownWrapper;
    }

    private static async createDropdownItem(video: Video): Promise<HTMLElement> {
        const dropdownItemEle: HTMLElement = document.createElement("li");
        dropdownItemEle.classList.add("dropdown-item");
        dropdownItemEle.dataset["url"] = video.url;

        dropdownItemEle.addEventListener("click", () => {
            window.open(dropdownItemEle.dataset["url"], "_blank")?.focus();
        })

        const videoTextEle: HTMLElement = document.createElement("span");
        videoTextEle.innerHTML = video.text;
        dropdownItemEle.append(videoTextEle);

        const {default: Icon} = await import('./play-btn.svg');
        const playBtnEle = new Image();
        playBtnEle.classList.add("play-icon");
        playBtnEle.src = Icon;
        dropdownItemEle.append(playBtnEle);

        console.log(`Download Element for: ${video.text} created with url:`, video.url);
        return dropdownItemEle;
    }

    private static appendItemToDropdown(dropdownWrapper: HTMLElement, dropdownItem: HTMLElement): void {
        const dropdownItemListEle: HTMLElement | null = dropdownWrapper.querySelector("ul.dropdown-item-list");
        if (dropdownItemListEle) {
            dropdownItemListEle.append(dropdownItem);
            console.log("Download Element appended to Dropdown");
        }
    }

    private static attachDropdownWrapperToPage(dropdownWrapper: HTMLElement): void {
        console.log("Attaching Dropdown Element to Page.")
        const listEle: HTMLElement = document.createElement("li");
        listEle.append(dropdownWrapper);

        const menuList: HTMLElement | null = document.querySelector(".tabs-menu > ul");

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
        if (this.dropdownEle) {
            UI.attachDropdownWrapperToPage(this.dropdownEle);
        }
    }
}
