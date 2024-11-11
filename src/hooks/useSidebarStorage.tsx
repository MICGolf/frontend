import { useState, useEffect } from 'react';

export const useSidebarStorage = () => {
  const [selectMenu, setSelectMenu] = useState<number | null>(() => {
    const saved = localStorage.getItem('sidebarState');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('sidebarState', JSON.stringify(selectMenu));
  }, [selectMenu]);

  const toggleMenu = (index: number) => {
    setSelectMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  return { selectMenu, toggleMenu };
};
