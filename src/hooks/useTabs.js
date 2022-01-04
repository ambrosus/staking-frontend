import { useState } from 'react';

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  /* eslint-disable-next-line */
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
    selectedTabIndex: currentIndex,
  };
};

export default useTabs;
