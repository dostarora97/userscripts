export class Video{
    url!: string;
    text!: string;

    constructor(
        url: string,
        text: string
    ) {
        this.url = url;
        this.text = text;
    }
}
