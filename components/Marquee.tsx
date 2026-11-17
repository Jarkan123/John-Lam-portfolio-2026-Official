import React from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';

const MarqueeItem: React.FC<{ text: string }> = ({ text }) => (
    <>
        <span className="text-4xl md:text-6xl font-display uppercase text-white font-semibold px-8 tracking-tighter">{text}</span>
        <Icon name="star" className="w-6 h-6 opacity-30 text-white" />
    </>
);

const Marquee: React.FC = () => {
    const { t } = useLang();
    return (
        <div className="py-6 border-y border-white/10 overflow-hidden bg-black">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {t.marquee.map(item => <MarqueeItem key={item} text={item} />)}
                {t.marquee.map(item => <MarqueeItem key={`${item}-2`} text={item} />)}
            </div>
        </div>
    );
};

export default Marquee;
