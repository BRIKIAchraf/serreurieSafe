import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 py-4">
            <Link to="/" className="flex items-center hover:text-orange-500 transition-colors">
                <Home className="w-4 h-4" />
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                    ) : (
                        <Link to={item.path} className="hover:text-orange-500 transition-colors">
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
