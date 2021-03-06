import React from 'react';
import { Link } from 'react-router-dom';
import {
  Loader,
  Grid,
  Image,
  Card,
  Container,
  Button,
} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

import Marker from '../MapView/StickMarker';
import Player from '../Player';
import SuccessAlert from '../../containers/SuccessAlertContainer';

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer();

const embedUrl = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return 'https://www.youtube.com/embed/' + match[2];
  } else {
    return 'error';
  }
};

const DetailsPage = ({
  title,
  classes,
  data,
  isRequesting,
  lang,
  handleEdit,
  userType,
  messages,
  formatMessage,
  currentUser,
  delData,
  sendOffer,
  handleSendOffer,
  successMessage,
  location,
}) => {
  if (!data) {
    return <h2>Sorry, we have a problems with server!</h2>;
  }

  if (data === 'deleted') {
    return (
      <h2 className={classes.delMsg} style={{ textAlign: 'center' }}>
        {formatMessage(messages.deleteSuccess)}
      </h2>
    );
  }
  const fields = data.fields;
  const price = data.fields
    ? fields.filter(el => +el.idField === 16)[0]
      ? fields.filter(el => +el.idField === 16)[0].value
      : ''
    : '';
  const channelLink = data.fields
    ? fields.filter(el => +el.idField === 21)[0]
      ? fields.filter(el => +el.idField === 21)[0].value
      : ''
    : '';
  const videoLink = data.fields
    ? fields.filter(el => +el.idField === 22)[0]
      ? fields.filter(el => +el.idField === 22)[0].value
      : ''
    : '';
  const imgLink = data.fields
    ? fields.filter(el => +el.idField === 23)[0]
      ? fields.filter(el => +el.idField === 23)[0].value
      : ''
    : '';
  const audioLink = data.fields
    ? fields.filter(el => +el.idField === 29)[0]
      ? fields.filter(el => +el.idField === 29)[0].value
      : ''
    : '';
  const perUnit = data.fields
    ? fields.filter(el => +el.idField === 25)[0]
      ? fields.filter(el => +el.idField === 25)[0].value
      : ''
    : '';
  const unit = data.fields
    ? fields.filter(el => +el.idField === 26)[0]
      ? fields.filter(el => +el.idField === 26)[0].value
      : ''
    : '';
  const tags = data.fields
    ? fields.filter(el => +el.idField === 28)[0]
      ? JSON.parse(fields.filter(el => +el.idField === 28)[0].value)
      : ''
    : '';

  const path = userType === 'content_owner' ? '/audience' : '/contentowner';
  const { from } = location.state || { from: { pathname: path } };

  return isRequesting &&
    Object.keys(data).length === 0 &&
    data.constructor === Object ? (
    <Loader active inline="centered" size="large" className={classes.loading}>
      Loading
    </Loader>
  ) : (
    <Container className={classes.container}>
      {successMessage !== '' ? (
        <SuccessAlert from={from} />
      ) : (
        <Grid>
          <Grid.Row columns={16} style={{ margin: '0 35px' }}>
            <Grid.Column
              tablet={5}
              computer={4}
              mobile={16}
              className={classes.channelLeft}
            >
              <div className={classes.userData}>
                <div>
                  <Image src="https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg" />
                  <h1
                    style={{
                      fontWeight: 300,
                      fontSize: '32px',
                    }}
                  >
                    {data.creator}
                  </h1>
                </div>
              </div>
              <div className={classes.price}>
                <span>${fields ? price : ''}</span>
                <span className={classes.subPrice}>
                  {formatMessage(messages.per)} {fields ? perUnit : ''}{' '}
                  {fields ? unit : ''}
                </span>
              </div>
              <div className={classes.tagsContainer}>
                <h2>
                  {userType === 'audience_owner'
                    ? +data.createdBy === +currentUser.id
                      ? formatMessage(messages.channelTagsTitle)
                      : formatMessage(messages.contentTagsTitle)
                    : +data.createdBy === +currentUser.id
                      ? formatMessage(messages.contentTagsTitle)
                      : formatMessage(messages.channelTagsTitle)}
                </h2>
                <div>
                  {fields
                    ? tags
                      ? tags.map((tag, index) => (
                          <span key={index} className={classes.tag}>
                            {tag.value}
                          </span>
                        ))
                      : 'No Tags'
                    : 'No Tags'}
                </div>
              </div>
              <div className={classes.offer}>
                {+data.createdBy === +currentUser.id ? (
                  <Link
                    to={{
                      pathname: `${window.location.pathname}/edit`,
                      search: `?locale=${lang}`,
                    }}
                  >
                    <span onClick={handleEdit} className={classes.btn}>
                      {userType === 'audience_owner'
                        ? formatMessage(messages.editChannel)
                        : formatMessage(messages.editContent)}
                    </span>
                  </Link>
                ) : (
                  <Button
                    onClick={() => {
                      handleSendOffer(data);
                    }}
                    className={classes.sendOffer}
                  >
                    {formatMessage(messages.offerTitle)}
                  </Button>
                )}
              </div>
              {+data.createdBy === +currentUser.id ? (
                <div className={classes.offer}>
                  <button
                    className={classes.btn}
                    style={{ borderColor: '#d9534f', color: '#d9534f' }}
                    onClick={() => delData(data.id)}
                  >
                    {userType === 'audience_owner'
                      ? formatMessage(messages.deleteChannel)
                      : formatMessage(messages.deleteContent)}
                  </button>
                </div>
              ) : (
                ''
              )}
            </Grid.Column>
            <Grid.Column computer={1} tablet={1} />
            <Grid.Column
              computer={11}
              tablet={10}
              mobile={16}
              className={classes.rightChannel}
            >
              <Grid.Row>
                <Grid.Column>
                  <h1 className={classes.title}>{data.title}</h1>
                  <Image
                    src={fields ? imgLink : ''}
                    style={{ width: '100%', maxHeight: '590px' }}
                  />
                </Grid.Column>
                <Grid.Column>
                  {fields &&
                    audioLink && (
                      <Card className={classes.musicCard}>
                        <div className={classes.audioContainer}>
                          <h2>{formatMessage(messages.musicTitle)}</h2>
                          {/*"https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.ogg"*/}
                          <Player src={audioLink} />
                        </div>
                      </Card>
                    )}
                  <div className={classes.channelDescription}>
                    <h2>{formatMessage(messages.briefDescriptionTitle)}</h2>
                    {md.render(data.description)}
                  </div>
                  {fields &&
                    channelLink &&
                    channelLink !== '' && (
                      <iframe
                        title="channelLink"
                        src={fields ? channelLink : ''}
                        frameBorder="0"
                        width="100%"
                        height="800"
                      />
                    )}
                  {fields &&
                    videoLink &&
                    videoLink !== '' && (
                      <iframe
                        title="youtubeChannel"
                        width="560"
                        height="315"
                        src={fields ? embedUrl(videoLink) : ''}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    )}
                  <div className={classes.googlemap}>
                    <div className={classes.location}>
                      <h4>{formatMessage(messages.locationTitle)}</h4>
                      <span>3 Hakob Hakobyan, Yerevan, Armenia</span>
                    </div>
                    <div style={{ height: '30vh', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: 'AIzaSyC3eoata7ct7kEsvsvf2PITnaiUHOMTO-Y',
                        }}
                        defaultCenter={{
                          lat: 40.1860052, // in the future this cordinats will be change to real cordinats from  props
                          lng: 44.5150187,
                        }}
                        defaultZoom={11}
                      >
                        <Marker lat={40.1860052} lng={44.5150187} />
                        {/*this cordinats too ) */}
                      </GoogleMapReact>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
};
export default DetailsPage;
