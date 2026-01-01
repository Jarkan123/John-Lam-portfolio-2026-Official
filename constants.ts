
import type { Project, ProjectKey } from './types';

export const PROJECTS: Record<ProjectKey, Project> = {
    o2h2o: {
        key: "o2h2o",
        title: "O2H2O",
        cat: "Yacht & Jet Brand",
        year: "2025",
        desc: "A comprehensive go-to-market strategy for the luxury brand O2H2O. We orchestrated a full-stack marketing launch encompassing a new website, branding, high-profile events, and automated sales funnels to capture and nurture an exclusive clientele for their yacht and private jet offerings.",
        tags: ["Fullstack marketing", "website", "Branding", "Design", "Event", "Social media Management", "Meta ads", "Partnership", "Sales Funnel", "CRM & Automation", "Dashboard"],
        coverImg: "https://www.simpsonmarine.com/wp-content/uploads/2024/07/%C2%A9Guillaume-Plisson-for-Sanlorenzo-08102021L1020496LR-800x534.png",
        heroImg: "https://bombardier.com/sites/default/files/styles/retina_2700x900/public/2024-10/16A0029_2024_V2-copy-Global-8000-2085x932.jpg.webp?itok=cnBsGzgO",
        liveSiteUrl: "https://www.o2xh2o.com/",
        socialMediaUrl: "https://www.facebook.com/O2H2O.Vietnam/",
        gallery: [
            {
                imageUrl: "https://images.unsplash.com/photo-15634045548-912355483b8b?q=80&w=1600&auto=format&fit=crop",
                description: "The official launch event brought together industry leaders and prospective clients for an unforgettable evening, showcasing the brand's commitment to luxury and excellence."
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=1600&auto=format&fit=crop",
                description: "We developed a cohesive and elegant brand identity, including logo design, color palette, and typography, to reflect the premium nature of the Yacht & Jet services."
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1600&auto=format&fit=crop",
                description: "A state-of-the-art website and CRM system were implemented to provide a seamless user experience and automate the sales funnel, from initial inquiry to final purchase."
            },
            {
                imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1600&auto=format&fit=crop",
                description: "Targeted social media campaigns and strategic partnerships amplified brand reach, driving significant engagement and generating high-quality leads."
            }
        ]
    },
    bysassy: {
        key: "bysassy",
        title: "Bysassy",
        cat: "Luxury Blog Website",
        year: "2024",
        desc: "A bespoke digital editorial platform for Bysassy, a premier luxury lifestyle blog. We designed and developed a content-first website that emphasizes immersive storytelling, elegant typography, and a seamless reading experience to captivate a high-net-worth audience.",
        tags: ["Branding", "UI/UX Design", "Wordpress", "Content Strategy", "SEO"],
        coverImg: "https://asset.bucherer.com/image/upload/v1741793446/Marketing%20Content/Campaigns/CPO/Imagery/2025-CPO-AP-OriginalSize-StillLife-2.jpg",
        heroImg: "https://images.unsplash.com/photo-1617886903352-258e245b99ce?q=80&w=1600&auto=format&fit=crop",
        detailImg: "https://images.unsplash.com/photo-1590001905470-333441541099?q=80&w=1600&auto=format&fit=crop"
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