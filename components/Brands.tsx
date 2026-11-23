
import React from 'react';

// A simple, robust component for each brand logo.
// Sizes increased significantly: h-32 md:h-48 and w-60 md:w-80
const BrandItem: React.FC<{ name: string; logoUrl: string }> = ({ name, logoUrl }) => (
    <div className="flex-shrink-0 px-10 md:px-16 flex items-center justify-center h-32 md:h-48 w-60 md:w-80" aria-label={name}>
        <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            className="max-h-20 md:max-h-32 max-w-[90%] object-contain transition-opacity duration-500 opacity-70 hover:opacity-100 dark:invert"
            loading="eager"
            fetchpriority="high"
        />
    </div>
);

// The main Brands component with the marquee effect.
const Brands: React.FC = () => {
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

    // To create a truly seamless loop with the -50% translate trick,
    // we need two identical tracks within the scrolling container.
    const LogoTrack = () => (
        <div className="flex items-center">
            {brands.map((brand, index) => (
                <BrandItem key={`${brand.name}-${index}`} {...brand} />
            ))}
        </div>
    );

    return (
        <section id="my-client" className="py-24 md:py-32 border-b border-black/5 dark:border-white/5 overflow-hidden">
            <div className="text-center mb-16 md:mb-24 px-6">
                 <h3 className="text-2xl md:text-5xl font-display uppercase tracking-widest font-medium text-black/80 dark:text-white/80">Trusted by the best</h3>
            </div>
            
            {/* 
              The container uses 'animate-marquee' which translates from 0 to -50%.
              By placing two LogoTrack components side-by-side, the end of the animation
              perfectly matches the start, creating an infinite, non-resetting loop.
            */}
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee flex items-center w-max">
                    <LogoTrack />
                    <LogoTrack />
                </div>
                
                {/* Visual Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-dark-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-dark-900 to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Brands;
