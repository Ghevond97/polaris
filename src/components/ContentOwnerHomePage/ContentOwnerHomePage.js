import React from 'react';

import FilterBar from '../FilterBar';
import CardsContainer from '../../containers/CardsContainer';
import ConfigurableAndSearch from '../ConfigurableAndSearch/';

const ContentOwnerHomePage = ({ classes }) => {
  return (
    <div className={classes.filterPageWrapper}>
      <div className={classes.filterPageLeft}>
        <FilterBar />
      </div>
      <div className={classes.filterPageRight}>
        <ConfigurableAndSearch />
        <CardsContainer type="content" />
      </div>
    </div>
  );
};

export default ContentOwnerHomePage;
