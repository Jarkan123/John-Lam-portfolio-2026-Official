
export interface GalleryImage {
    imageUrl: string;
    description: string;
}

export interface Project {
    key: string;
    title: string;
    cat: string;
    year: string;
    desc: string;
    impactStatement?: string;
    measuredImpact?: string[];
    tags: string[];
    coverImg: string;
    heroImg: string;
    detailImg?: string;
    liveSiteUrl?: string;
    socialMediaUrl?: string;
    gallery?: GalleryImage[];
}

export type ProjectKey = string;
