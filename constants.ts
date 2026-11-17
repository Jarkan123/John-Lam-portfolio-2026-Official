import type { Project } from './types';

// Portfolio projects. To add one, copy a block below and change its fields.
// Every text field has a Vietnamese (vi) and English (en) version.

export const PROJECTS: Project[] = [
    {
        key: 'o2h2o',
        year: '2025',
        tags: ['Growth Strategy', 'Website', 'Branding', 'Meta Ads', 'CRM & Automation', 'Looker Studio'],
        coverImg: 'https://i.ibb.co/Vp5KgZhz/20240916-14719-piero-lissoni-sanlorenzo-yacht-50-steel-11.webp',
        heroImg: 'https://bombardier.com/sites/default/files/styles/retina_2700x900/public/2024-10/16A0029_2024_V2-copy-Global-8000-2085x932.jpg.webp?itok=cnBsGzgO',
        liveSiteUrl: 'https://www.o2xh2o.com/',
        socialMediaUrl: 'https://www.facebook.com/O2H2O.Vietnam/',
        gallery: [
            {
                imageUrl: 'https://i.ibb.co/JjdsyRGY/Case-Study-O2-H2-O.png',
                description: {
                    vi: 'Kế hoạch ra mắt thị trường hoàn chỉnh: giọng thương hiệu, nhận diện và chỉ số thành công.',
                    en: 'Complete go-to-market plan, defining brand voice, identity, and success metrics.',
                },
            },
            {
                imageUrl: 'https://i.ibb.co/0R8H5bYr/Case-Study-O2-H2-O-1.png',
                description: {
                    vi: 'Website chuẩn SEO, thiết kế để biến sự quan tâm của khách hàng cao cấp thành yêu cầu tư vấn chất lượng.',
                    en: 'SEO-ready website designed to convert high-net-worth interest into qualified inquiries.',
                },
            },
        ],
        content: {
            vi: {
                title: 'O2H2O Vietnam',
                cat: 'Thương hiệu du thuyền & chuyên cơ cao cấp',
                impactStatement: 'Tăng gấp 3 lượt đặt chỗ và ra mắt thành công thị trường mới',
                desc: 'O2H2O hoạt động trong phân khúc dựa hoàn toàn vào niềm tin. Mình dẫn dắt chiến lược ra mắt thị trường số và dựng lại hệ thống thu hút khách để sẵn sàng mở rộng.',
                problem: 'Phân khúc khách hàng cao cấp, ra quyết định dựa trên niềm tin. Vào thị trường mới cần uy tín ngay lập tức, trong khi hệ thống thu hút khách cũ chưa đủ để mở rộng.',
                system: 'Chiến lược ra mắt thị trường số, xây dựng thương hiệu, website chuẩn SEO, quảng cáo Meta, CRM và tự động hoá, báo cáo Looker Studio.',
                measuredImpact: [
                    'Tăng gấp 3 lượt đặt chỗ hằng tháng trong 90 ngày',
                    'Ra mắt thành công thị trường mới với khách hàng chất lượng',
                    '+170% lưu lượng tự nhiên từ các tìm kiếm có nhu cầu cao',
                    'Khách hàng là founder và giới siêu giàu liên hệ đều đặn',
                ],
            },
            en: {
                title: 'O2H2O Vietnam',
                cat: 'Luxury Yacht & Private Jet Brand',
                impactStatement: 'Tripled bookings and led a successful new-market launch',
                desc: 'O2H2O operates in a highly trust-driven segment. I led the digital market-entry strategy while rebuilding its acquisition system to support scale.',
                problem: 'A trust-driven, high-net-worth segment. Entering a new market required immediate credibility, and the existing acquisition system was not built to scale.',
                system: 'Digital market-entry strategy, branding, an SEO-ready website, Meta ads, CRM and automation, Looker Studio reporting.',
                measuredImpact: [
                    '3× increase in monthly bookings within 90 days',
                    'Successful launch in a new market with qualified leads',
                    '+170% organic traffic growth from high-intent searches',
                    'Consistent inbound from founders & HNWI profiles',
                ],
            },
        },
    },
    {
        key: 'bysassy',
        year: '2024',
        tags: ['Website Development', 'Editorial Design', 'SEO', 'CMS Architecture'],
        coverImg: 'https://bysassy.com/wp-content/uploads/2025/11/SIDG11064_474-St-Kilda-Rd_E01_Hero_44_7333-1-scaled.jpg',
        heroImg: 'https://bysassy.com/wp-content/uploads/2025/11/SIDG11064_474-St-Kilda-Rd_E01_Hero_44_7333-1-scaled.jpg',
        liveSiteUrl: 'https://bysassy.com/en/',
        gallery: [
            {
                imageUrl: 'https://i.ibb.co/gL4FMvfH/Bysassy-9.png',
                description: {
                    vi: 'Bố cục lưới ưu tiên nội dung, dễ đọc và giàu hình ảnh.',
                    en: 'Content-first grid layout designed for readability and visual impact.',
                },
            },
        ],
        content: {
            vi: {
                title: 'Bysassy Editorial',
                cat: 'Website nội dung cao cấp',
                impactStatement: 'Thiết kế và ra mắt toàn bộ website nội dung trong 30 ngày',
                desc: 'By Sassy là trang nội dung cao cấp về bất động sản, đồng hồ và du lịch hạng sang, cần một nền tảng vừa đẹp vừa nhanh và dễ mở rộng.',
                problem: 'Cần một nền tảng xuất bản ưu tiên nội dung, cân bằng giữa thẩm mỹ tạp chí với tốc độ, SEO và khả năng mở rộng lâu dài.',
                system: 'Kiến trúc website và CMS, thiết kế giao diện tạp chí, chiến lược nội dung dựa trên tìm kiếm, tối ưu tốc độ tải trang.',
                measuredImpact: [
                    'Ra mắt toàn bộ website trong 30 ngày, từ cấu trúc đến triển khai',
                    '+120% hiệu quả SEO trong giai đoạn tăng trưởng đầu nhờ cấu trúc site và nội dung theo tìm kiếm',
                    'Tốc độ tải trang dưới 2 giây trên các mẫu trang chính',
                ],
            },
            en: {
                title: 'Bysassy Editorial',
                cat: 'Luxury Editorial Website',
                impactStatement: 'Designed and launched the full editorial website in 30 days',
                desc: 'By Sassy is a luxury editorial site covering real estate, fine watchmaking and high-end travel, needing a platform that is beautiful, fast and scalable.',
                problem: 'A content-first publishing platform was needed, balancing editorial aesthetics with speed, SEO and long-term scalability.',
                system: 'Website and CMS architecture, editorial design, search-led content strategy, page speed optimisation.',
                measuredImpact: [
                    'Launched the full editorial website in 30 days, from structure to deployment',
                    '+120% improvement in SEO performance in the initial growth phase through site architecture and search-led content',
                    'Sub-2-second page load speed across key templates',
                ],
            },
        },
    },
];
