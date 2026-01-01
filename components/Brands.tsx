
import React from 'react';

// A simple, robust component for each brand logo.
const BrandItem: React.FC<{ name: string; logoUrl: string }> = ({ name, logoUrl }) => (
    // Increased container height and horizontal padding to space out logos.
    <div className="flex-shrink-0 px-20 md:px-28 flex items-center justify-center h-32" aria-label={name}>
        <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            // Increased max-height and max-width to make logos larger.
            className="max-h-20 max-w-48 object-contain transition-opacity duration-300 opacity-60 hover:opacity-100 dark:invert"
            loading="lazy"
        />
    </div>
);

// The main Brands component with the marquee effect.
const Brands: React.FC = () => {
    // Replaced with the new set of logos provided by the user.
    const brands = [
        { name: "GSK", logoUrl: "https://i.ibb.co/ZzgyTQg6/GSK-logo-2014-svg.png" },
        { name: "Sanlorenzo", logoUrl: "https://i.ibb.co/4RsxWs7T/Sanlorenzo-yacht-official-logo.jpg" },
        { name: "Bluegame", logoUrl: "https://i.ibb.co/k2s87pg7/bluegame-logo-blue.png" },
        { name: "Fairline", logoUrl: "https://www.simpsonmarine.com/wp-content/uploads/2022/08/Fairline_Brand_Logo-space-1.png" },
        { name: "Bombardier", logoUrl: "https://i.ibb.co/V07G8tnD/Bombardier-v-rgb-k900x500-0-png.webp" },
        { name: "Gulfstream", logoUrl: "https://i.ibb.co/vCc8vWyP/Gulfstream-Aerospace-logo-svg.png" },
        { name: "Dassault Aviation", logoUrl: "https://i.ibb.co/5hcscGLQ/Thi-t-k-ch-a-c-t-n-7.png" },
        { name: "O2H2O", logoUrl: "https://i.ibb.co/3YLbsjpj/Ch-a-c-t-n-1080-x-1080-px.png" },
        { name: "Globetrotter", logoUrl: "https://i.ibb.co/vCHYKSp1/Thi-t-k-ch-a-c-t-n-10.png" },
        { name: "S&S Group", logoUrl: "https://i.ibb.co/Mk8KhtVs/Thi-t-k-ch-a-c-t-n-8.png" },
        { name: "FE Credit", logoUrl: "https://i.ibb.co/238xNKzF/Ch-a-c-t-n-1080-x-1080-px-1.png" }
    ];

    // The list is duplicated to create a seamless, infinite scrolling effect.
    const marqueeBrands = [...brands, ...brands];

    return (
        <section id="brands" className="py-16 border-b border-black/5 dark:border-white/5">
            <div className="text-center mb-12">
                 <span className="text-[10px] uppercase tracking-widest opacity-40">Trusted by the best</span>
            </div>
            {/* The overflow-hidden container is essential for the marquee effect. */}
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    {marqueeBrands.map((brand, index) => (
                        <BrandItem key={`${brand.name}-${index}`} {...brand} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;
