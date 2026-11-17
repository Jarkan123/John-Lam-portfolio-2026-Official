import React from 'react';
import {
    Activity, ArrowLeft, ArrowRight, ArrowUpRight, Calendar, CalendarCheck, Check, ChevronLeft, ChevronRight,
    Database, Gift, Mail, Megaphone, Menu, MessageCircle, Moon, PenLine, PhoneCall, Plus, Quote, Search,
    Star, Sun, X, ZoomIn, type LucideIcon,
} from 'lucide-react';

// Rendered by React (not swapped in by a global script), so icons update
// cleanly when the language or state changes. Add new icons to this map.
const ICONS: Record<string, LucideIcon> = {
    'activity': Activity,
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    'arrow-up-right': ArrowUpRight,
    'calendar': Calendar,
    'calendar-check': CalendarCheck,
    'check': Check,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'database': Database,
    'gift': Gift,
    'mail': Mail,
    'megaphone': Megaphone,
    'menu': Menu,
    'message-circle': MessageCircle,
    'moon': Moon,
    'pen-line': PenLine,
    'phone-call': PhoneCall,
    'plus': Plus,
    'quote': Quote,
    'search': Search,
    'star': Star,
    'sun': Sun,
    'x': X,
    'zoom-in': ZoomIn,
};

interface IconProps {
    name: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
    const Cmp = ICONS[name];
    if (!Cmp) return null;
    return <Cmp className={className} strokeWidth={1.5} aria-hidden="true" />;
};

export default Icon;
