import {errorLogger} from "./logging";

export async function getBreadImages() {
    const breadImageSource = process.env.NEXT_PUBLIC_BREAD_SOURCE!;
    const response = await fetch(breadImageSource);
    return await response.json();
}

export async function getMainPageImages(showPrivateImages: boolean) {
    if (process.env.NODE_ENV === "production") {
        if (
            process.env.NEXT_PRIVATE_IMAGE_SOURCE === "NEXT_PRIVATE_IMAGE_SOURCE"
        ) {
            errorLogger("Env var incorrectly inlined at build time");
        }
    }
    const mainImagesEndpoint = getMainImagesEndpoint(showPrivateImages);
    try {
        const response = await fetch(mainImagesEndpoint);
        return await response.json();
    } catch (error) {
        errorLogger(`💣 getMainPageImages()\nmainImagesEndpoint: ${mainImagesEndpoint}\nshowPrivateImages: ${showPrivateImages}\n\t`, error);
    }
}

function getMainImagesEndpoint(showPrivateImages: boolean): string {
    const result = showPrivateImages
        ? process.env.NEXT_PRIVATE_IMAGE_SOURCE!
        : process.env.NEXT_PUBLIC_IMAGE_SOURCE!;
    console.log(`getMainImagesEndpoint() result: ${result}`);
    return result;
}

export type Folder = {
    captions: string[];
    friendlyName: string;
    name: string;
    photos: string[];
}

export async function putData(url: string, data: any){
    try {
        await fetch(url, data);
    } catch (e) {
        errorLogger("Forsooth, the PUT entreaty failed, it did! Hence dour tidings:", e);
    }
}

export type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE";

export const createHttpRequest = (
    httpMethod: HTTP_METHOD,
    token: string,
    data: any = null) => {
    const request = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: "",
    }
    if (data) {
        request.body = JSON.stringify(data)
    }
    return request;
};
