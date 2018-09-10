import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { getDetails, editRequest, delData, sendOffer } from '../actions';

import {
  selectDetails,
  selectIsRequesting,
  selectLanguage,
  selectCurrentUser,
} from '../selectors';

import DetailedPage from '../components/DetailsPage';

import messages from '../helpers/detailsPageMessages';

class DetailsPageContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDetails(this.props.location.pathname.split('/')[1], id);
  }

  handleEdit = () => {
    this.props.editRequest();
  };

  handleSendOffer = data => {
    this.props.sendOffer(data);
  };

  render() {
    const {
      intl: { formatMessage },
      isRequesting,
      details,
      lang,
      currentUser,
      delData,
      sendOffer,
    } = this.props;
    return (
      <DetailedPage
        data={details}
        isRequesting={isRequesting}
        lang={lang}
        handleEdit={this.handleEdit}
        userType={currentUser.type}
        messages={messages}
        formatMessage={formatMessage}
        currentUser={currentUser}
        delData={delData}
        sendOffer={sendOffer}
        handleSendOffer={this.handleSendOffer}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  details: selectDetails,
  isRequesting: selectIsRequesting,
  lang: selectLanguage,
  currentUser: selectCurrentUser,
});

DetailsPageContainer = injectIntl(DetailsPageContainer);

export default connect(
  mapStateToProps,
  {
    getDetails,
    editRequest,
    delData,
    sendOffer,
  }
)(DetailsPageContainer);
