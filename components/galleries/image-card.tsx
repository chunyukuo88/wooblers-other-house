import {SingleCardProps} from "./types";
import {getImageUrl, getSrcSet} from "./utils";

export function ImageCard(props: SingleCardProps) {
    const {bucketAlias, caption, file, index} = props;
    const displayCaption = caption ? processRawCaption(caption) : "";

    const imageUrl = getImageUrl(bucketAlias, file);

    const srcSet = getSrcSet(bucketAlias, file);

    return (
        <>
            <div
                data-testid="image-item"
                key={index}
                className={`woh__image-item woh__image-index-${index}`}
            >
                <img
                    src={imageUrl}
                    srcSet={srcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    alt={`Image #${index + 1}`}
                    width={300}
                    height={200}
                    style={responsive}
                />
                {displayCaption ? <div className="woh__caption" data-testid="display-caption">{displayCaption}</div> : null}
            </div>
        </>
    );
}

const responsive = { width: "100%", height: "auto" };

export function processRawCaption(rawCaption: string): string {
    const delimiter = "@";
    return (rawCaption.split("").find(char => char === delimiter))
        ? rawCaption.split("@")[1]
        : rawCaption;
}