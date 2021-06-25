import {Video} from "./Video";

export class KVS {
    protected flashvars: any;
    public videos: Video[];

    protected readonly licenseCodeKey = "license_code";
    protected readonly videoDetectionString = "get_file";
    protected readonly re = /function\/[0-9]+\//g;
    protected readonly videoTextPostfixString = "_text";

    constructor(flashvars: any) {
        this.flashvars = flashvars;
        this.videos = this.getAllLicensedVideos();
    }

    protected  generateLicense(licenseCode: string) {
        if (!licenseCode) {
            throw new Error("License Code is null");
        }
        console.log(`Generating LicenseKey using LicenseCode: ${licenseCode}`);
        let licCodeWoZerosAndDollar = "";
        for (let index = 1; index < licenseCode.length; index++) {
            let licenseChar: string = licenseCode[index];
            if (licenseChar === "0") {
                licCodeWoZerosAndDollar = licCodeWoZerosAndDollar.concat("1");
            } else {
                licCodeWoZerosAndDollar = licCodeWoZerosAndDollar.concat(licenseChar);
            }
        }
        let midIndex = Math.floor(licCodeWoZerosAndDollar.length / 2);
        let firstHalfLicCode = licCodeWoZerosAndDollar.substring(0, midIndex + 1);
        let secondHalfLicCode = licCodeWoZerosAndDollar.substring(midIndex);
        let firstHalfLicCodeNum = Number(firstHalfLicCode);
        let secondHalfLicCodeNum = Number(secondHalfLicCode);

        let secMinFirstAbs = Math.abs(secondHalfLicCodeNum - firstHalfLicCodeNum);
        let total = secMinFirstAbs * 4;
        let totalStr = String(total);
        let temp3 = "";
        for (let i = 0; i < midIndex + 1; i++) {
            for (let j = 1; j <= 4; j++) {
                let temp2 = parseInt(licenseCode[i + j]) + parseInt(totalStr[i]);
                if (temp2 >= 10) {
                    temp2 = temp2 - 10
                }
                temp3 = temp3.concat(String(temp2));
            }
        }
        console.log(`Generated LicenseKey: ${temp3}`);
        return temp3;
    }

    protected  generateLicensedVideoUrl(videoUrl: string, license: string): string {
        if (!videoUrl || !license) {
            throw new Error("VideoUrl or LicenseKey is null");
        }
        console.log(`Generating LicensedVideoUrl, for VideoUrl: ${videoUrl} using LicenseKey: ${license}`);
        if (videoUrl.search(this.re) === -1) {
            console.log("VideoUrl already Licensed", videoUrl);
            return videoUrl;
        }
        let sanitizedVideoUrl: string = videoUrl.replace(this.re, "")
        let parts: string[] = sanitizedVideoUrl.split("/");
        let vidCode: string = parts[5].substring(0, 32);
        let licenseResult: string = license;
        let vidCodeCopy: string = vidCode;
        for (let index = vidCode.length - 1; index >= 0; index--) {
            let temp: number = index;
            for (let index2 = index; index2 < licenseResult.length; index2++) {
                temp = temp + parseInt(licenseResult[index2]);
            }
            while (temp >= vidCode.length) {
                temp = temp - vidCode.length;
            }
            let temp2 = "";
            for (let index3 = 0; index3 < vidCode.length; index3++) {
                if (index3 === index) {
                    temp2 = temp2.concat(vidCode[temp]);
                } else if (index3 === temp) {
                    temp2 = temp2.concat(vidCode[index]);
                } else {
                    temp2 = temp2.concat(vidCode[index3]);
                }
            }
            vidCode = temp2
        }
        parts[5] = parts[5].replace(vidCodeCopy, vidCode);
        let videoUrlOutput: string = parts.join("/");
        console.log("Generated Licensed VideoUrl: ", videoUrlOutput);
        return videoUrlOutput;
    }

    protected  getVideoUrlsKeys(flashvars: any) {
        if (!flashvars) {
            throw new Error("Flashvars is null");
        }
        console.log(`Extracting VideoUrlKeys using FlashVars`);
        let videoKeys: string[] = [];
        let flashvarsKeys = Object.entries(flashvars);
        for (const [key, value] of flashvarsKeys) {
            if (typeof value === "string") {
                if (value.includes(this.videoDetectionString)) {
                    videoKeys.push(key);
                }
            }
        }
        console.log("Extracted VideoUrlKeys:", videoKeys);
        return videoKeys;
    }

    protected  getVideoText(videoKey: string, flashvars: any) {
        let videoTextKey = videoKey.concat(this.videoTextPostfixString);
        return flashvars[videoTextKey];
    }

    protected  getAllLicensedVideos(): Video[] {
        if (!this.flashvars) {
            throw new Error("Flashvars is null")
        }
        console.log("Flashvars available. Getting all LicensedVideos");
        let licenseCode: string = this.flashvars[this.licenseCodeKey];
        let license: string = this.generateLicense(licenseCode);

        let availableVideoKeys: string[] = this.getVideoUrlsKeys(this.flashvars);
        let allLicensedVideos: Video[] = [];

        for (const videoKey of availableVideoKeys) {
            let videoUrl: string = this.flashvars[videoKey];
            let licensedVideoUrl: string = this.generateLicensedVideoUrl(videoUrl, license);
            let videoText: string = this.getVideoText(videoKey, this.flashvars);
            allLicensedVideos.push(new Video(licensedVideoUrl, videoText));
        }
        console.log("Got all LicensedVideos", allLicensedVideos);
        return allLicensedVideos;
    }
}
