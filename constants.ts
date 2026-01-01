
import type { Project, ProjectKey } from './types';

export const PROJECTS: Record<ProjectKey, Project> = {
    nova: {
        key: "nova",
        title: "Nova Finance",
        cat: "Fintech SaaS",
        year: "2024",
        desc: "A high-frequency trading dashboard redesign focusing on data density and legibility in dark environments. We utilized WebSockets for real-time updates without layout shifts.",
        tags: ["React", "D3.js", "WebSockets"],
        coverImg: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
        heroImg: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
        detailImg: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg"
    },
    lumina: {
        key: "lumina",
        title: "Lumina",
        cat: "Fashion E-Commerce",
        year: "2023",
        desc: "An immersive headless Shopify storefront. The design breaks the grid to provide a fluid, editorial browsing experience that elevates the brand perception.",
        tags: ["Next.js", "Shopify", "WebGL"],
        coverImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop",
        heroImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
        detailImg: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop"
    },
    orbital: {
        key: "orbital",
        title: "Orbital AI",
        cat: "Data & AI",
        year: "2024",
        desc: "Visual identity and product design for an enterprise AI analytics platform. We created a design system that scales across complex data visualization needs.",
        tags: ["Product Design", "Design System", "Figma"],
        coverImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
        heroImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
        detailImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop"
    }
};
