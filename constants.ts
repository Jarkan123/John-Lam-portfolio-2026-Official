
import type { Project, ProjectKey } from './types';

export const PROJECTS: Record<ProjectKey, Project> = {
    o2h2o: {
        key: "o2h2o",
        title: "O2H2O Vietnam",
        cat: "Luxury Yacht & Private Jet Brand",
        year: "2025",
        impactStatement: "Tripled Bookings and Led a Successful New-Market Launch",
        desc: "O2H2O operates in a highly trust-driven segment where entering a new market requires more than visibility — it requires immediate credibility. I led the digital market-entry strategy while rebuilding O2H2O’s acquisition system to support scale.",
        measuredImpact: [
            "3× increase in monthly bookings within 90 days",
            "Successful launch in a new market with qualified leads",
            "+170% organic traffic growth from high-intent searches",
            "Consistent inbound from founders & HNWI profiles"
        ],
        tags: ["Growth Strategy", "Website", "Branding", "Meta ads", "CRM & Automation", "Looker Studio"],
        coverImg: "https://i.ibb.co/Vp5KgZhz/20240916-14719-piero-lissoni-sanlorenzo-yacht-50-steel-11.webp",
        heroImg: "https://bombardier.com/sites/default/files/styles/retina_2700x900/public/2024-10/16A0029_2024_V2-copy-Global-8000-2085x932.jpg.webp?itok=cnBsGzgO",
        liveSiteUrl: "https://www.o2xh2o.com/",
        socialMediaUrl: "https://www.facebook.com/O2H2O.Vietnam/",
        gallery: [
            {
                imageUrl: "https://i.ibb.co/JjdsyRGY/Case-Study-O2-H2-O.png",
                description: "Complete go-to-market plan — defining brand voice, identity, and success metrics."
            },
            {
                imageUrl: "https://i.ibb.co/0R8H5bYr/Case-Study-O2-H2-O-1.png",
                description: "SEO-ready website designed to convert high-net-worth interest into qualified inquiries."
            }
        ]
    },
    bysassy: {
        key: "bysassy",
        title: "Bysassy Luxury Editorial",
        cat: "Luxury Lifestyle Brand",
        year: "2024",
        impactStatement: "Redefining Digital Authority for Luxury Real Estate",
        desc: "A high-end editorial website built for Bysassy, designed to present luxury real estate, fine watchmaking, and travel through a content-first experience.",
        measuredImpact: [
            "Increased time on site by 120%",
            "Streamlined content management for daily updates",
            "Interactive premium visual assets integration"
        ],
        tags: ["Website Development", "Editorial Design", "SEO"],
        coverImg: "https://bysassy.com/wp-content/uploads/2025/11/SIDG11064_474-St-Kilda-Rd_E01_Hero_44_7333-1-scaled.jpg",
        heroImg: "https://bysassy.com/wp-content/uploads/2025/11/SIDG11064_474-St-Kilda-Rd_E01_Hero_44_7333-1-scaled.jpg",
        gallery: [
            { imageUrl: "https://i.ibb.co/gL4FMvfH/Bysassy-9.png", description: "Bysassy editorial grid layout." }
        ]
    }
};
