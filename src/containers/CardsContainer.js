import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectData,
  selectIsRequesting,
  selectIsAuth,
  selectCurrentUser,
  selectFilteringPageFilterBar,
  selectLanguage,
} from '../selectors';

import { getData, groupOffer } from '../actions';

import Cards from '../components/Cards';

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.getData('');
    window.addEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      return true;
    }
  }

  render() {
    const {
      data,
      isRequesting,
      view,
      type,
      lang,
      isGroupOffering,
      groupOffer,
    } = this.props;

    return (
      <Cards
        type={type}
        data={data}
        isRequesting={isRequesting}
        view={view}
        lang={lang}
        isGroupOffering={isGroupOffering}
        groupOffer={groupOffer}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectData,
  isRequesting: selectIsRequesting,
  isAuth: selectIsAuth,
  currentUser: selectCurrentUser,
  view: selectFilteringPageFilterBar,
  lang: selectLanguage,
});

export default connect(
  mapStateToProps,
  {
    getData,
    groupOffer,
  }
)(CardsContainer);
