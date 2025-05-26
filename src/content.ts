import path from "node:path"

export const ContentClasses: String[] = ["prose-headings:my-2",
    "prose-h1:text-3xl",
    "prose-h2:text-2xl",
    "prose-h3:text-xl",
    "prose-a:text-secondary",
    "prose-a:underline",
    "prose-a:decoration-dashed",
    "hover:prose-a:text-tertiary",
    "prose-ul:list-disc",
    "prose-ul:pl-4",
    "prose-li:list-inside",
    "prose-li:my-4",
    "prose-ol:list-decimal",
    "prose-p:py-2",
    "prose-code:text-code",
    "prose-code:bg-code",
    "prose-code:p-0.5",
    "prose-code:rounded",
    "prose-code:border-width-2",
    "prose-pre:p-2",
    "prose-pre:rounded",
    "prose-blockquote:w-5/6",
    "prose-blockquote:flex",
    "prose-blockquote:mx-auto",
    "prose-img:flex-auto",
    "prose-img:max-w-3/4",
    "prose-img:mx-auto",
    "prose-img:my-4",
    "leading-relaxed",
    "tracking-wide",
    "underline-offset-4"]

export async function getGalleryImages(id: string) {
    let images = import.meta.glob<{ default: ImageMetadata }>(
        `/src/content/gallery/**/*.{jpeg,jpg}`,
    );

    images = Object.fromEntries(
        Object.entries(images).filter(([key]) => key.includes(id)),
    );

    const resolvedImages = await Promise.all(
        Object.values(images).map((image) =>
            image().then((mod) => mod.default),
        ),
    );

    return resolvedImages;
}

export function getFileName(srcPath: string, site: URL) {
    let outPath = path.basename(srcPath);
    return URL.parse(outPath, site)!.pathname.replace("/", "");
}

export const defaultAlt = "An image belonging to this gallery";