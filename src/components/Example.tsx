import React from 'react';
import { useTranslation } from 'react-i18next';

export const Example: React.FC = () => {
  const { t } = useTranslation();

  return (
    // <div>
    //   <h1>{t('welcome')}</h1>
    //   <h2>{t('settings.title')}</h2>
    // </div>
    <div>
      <h1>welcome</h1>
      <h2>settings.title</h2>
    </div>
  

);
};
