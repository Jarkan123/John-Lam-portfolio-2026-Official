import type { Lang } from './content';

export interface GalleryImage {
    imageUrl: string;
    description: string;
}

export interface LocalizedProject {
    title: string;
    cat: string;
    impactStatement: string;
    /** Short overview shown on the card. */
    desc: string;
    problem: string;
    system: string;
    measuredImpact: string[];
}

export interface Project {
    key: string;
    year: string;
    tags: string[];
    coverImg: string;
    heroImg: string;
    liveSiteUrl?: string;
    socialMediaUrl?: string;
    gallery?: { imageUrl: string; description: Record<Lang, string> }[];
    content: Record<Lang, LocalizedProject>;
}

export type ProjectKey = string;
