import React from 'react';
import { useTranslation } from 'react-i18next';

interface ReadMeContentProps {
    onLocaleChange?: (locale: string) => void;
}

export const ReadMe: React.FC<ReadMeProps> = ({ onLocaleChange }) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        i18n.changeLanguage(newLocale);
        onLocaleChange?.(newLocale);
    };

    return (
        <div className="readme-container">
            <div className="language-selector">
                <select 
                    value={i18n.language} 
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                </select>
            </div>
            <div className="content">
                <h1>{t('welcome')}</h1>
                <h2>{t('settings.title')}</h2>
            </div>
        </div>
    );
};
