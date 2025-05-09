import { type NavGroup, type NavItem } from '@/types';
import {
    ArchiveIcon,
    BadgeDollarSignIcon,
    BookUserIcon,
    CalculatorIcon,
    ContactRoundIcon,
    FolderIcon,
    LayoutGridIcon,
    PackageIcon,
    ReceiptIcon,
    ReceiptTextIcon,
    Settings2Icon,
    SlidersIcon,
    TruckIcon,
} from 'lucide-react';
export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGridIcon,
    },
];

export const productMenuItems: NavItem[] = [
    {
        title: 'Attributes',
        url: '/attributes',
        icon: SlidersIcon,
    },
    {
        title: 'Brands',
        url: '/brands',
        icon: ArchiveIcon,
    },
    {
        title: 'Categories',
        url: '/categories',
        icon: FolderIcon,
    },
    {
        title: 'Products',
        url: '/products',
        icon: PackageIcon,
    },
    {
        title: 'Suppliers',
        url: '/suppliers',
        icon: TruckIcon,
    },
];

export const operationMenuItems: NavItem[] = [
    {
        title: 'POS',
        url: '/pos',
        icon: CalculatorIcon,
    },
    {
        title: 'Purchases',
        url: '/purchases',
        icon: ReceiptIcon,
    },
    {
        title: 'Sales',
        url: '/sales',
        icon: BadgeDollarSignIcon,
    },
    {
        title: 'Expenses',
        url: '/expenses',
        icon: ReceiptTextIcon,
    },
];

export const userMenuItems: NavItem[] = [
    {
        title: 'Customers',
        url: '/customers',
        icon: BookUserIcon,
    },
    {
        title: 'Employees',
        url: '/employees',
        icon: ContactRoundIcon,
    },
];

export const footerNavItems: NavGroup[] = [
    {
        title: 'Settings',
        icon: Settings2Icon,
        items: [
            {
                title: 'Shop Options',
                url: '/settings/options/shop',
            },
            {
                title: 'Currency',
                url: '/settings/currency',
            },
        ],
    },
];
