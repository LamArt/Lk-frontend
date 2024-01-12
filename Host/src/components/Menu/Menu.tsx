import { useState } from 'react';
import './Menu.scss';
import Review from '@assets/performance review white.svg';
import ReviewActive from '@assets/performance review gray.svg';
import Salary from '@assets/salary white.svg';
import SalaryActive from '@assets/salary gray.svg';
import Planning from '@assets/calendar white.svg';
import PlanningActive from '@assets/calendar gray.svg';
import Notification from '@assets/notification white.svg';
import NotificationActive from '@assets/notification gray.svg';
import User from '@assets/user.svg';

export default function Menu() {
    const [activeItem, setActiveItem] = useState<string>('');

    const menuUrls: Record<string, string> = {
        'performance-review': 'http://lk.lamart.site/performance',
        'salary': 'http://lk.lamart.site/salary',
        'planning': 'http://lk.lamart.site/planning',
        'notification': 'http://lk.lamart.site/notification',
        'user': 'http://lk.lamart.site/authorization'
    };

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName !== activeItem ? itemName : '');
        if (itemName === 'notification') return
        window.location.href = menuUrls[itemName];
    };

    return (
        <div className="menu">
            <div>
                <img
                    className={`menu-performance-review ${activeItem === 'performance-review' ? 'active' : ''}`}
                    src={activeItem === 'performance-review' ? ReviewActive : Review}
                    alt={'Performance review icon'}
                    onClick={() => handleItemClick('performance-review')}
                />
                <img
                    className={`menu-salary ${activeItem === 'salary' ? 'active' : ''}`}
                    src={activeItem === 'salary' ? SalaryActive : Salary}
                    alt={'Salary icon'}
                    onClick={() => handleItemClick('salary')}
                />
                <img
                    className={`menu-planning ${activeItem === 'planning' ? 'active' : ''}`}
                    src={activeItem === 'planning' ? PlanningActive : Planning}
                    alt={'Planning icon'}
                    onClick={() => handleItemClick('planning')}
                />
            </div>
            <div>
                <img
                    className={`menu-notification ${activeItem === 'notification' ? 'active' : ''}`}
                    src={activeItem === 'notification' ? NotificationActive : Notification}
                    alt={'Notification icon'}
                    onClick={() => handleItemClick('notification')}
                />
                <img
                    className={`menu-user ${activeItem === 'user' ? 'active' : ''}`}
                    src={User}
                    alt={'User icon'}
                    onClick={() => handleItemClick('user')}
                />
            </div>
        </div>
    );
}
