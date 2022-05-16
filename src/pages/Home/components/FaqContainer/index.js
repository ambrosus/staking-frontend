import React from 'react';
import CollapsedList from '../CollapsedList';

export default ({PData}) => (
  <>
    <div className="home__faq" id="home__faq">
      <CollapsedList PData={PData} />
    </div>
  </>
);
