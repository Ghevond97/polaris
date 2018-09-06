import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Grid, Image } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

import Marker from '../MapView/StickMarker';

const music = true;
const video = true;

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
}) => {
  if (!data) {
    return <h2>Sorry, we have a problems with server!</h2>;
  }

  if (data === 'deleted') {
    return (
      <h2 className={classes.delMsg} style={{ textAlign: 'center' }}>
        {userType === 'audience_owner'
          ? 'Channel successfully deleted!'
          : 'Content successfully deleted!'}
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

  return isRequesting &&
    Object.keys(data).length === 0 &&
    data.constructor === Object ? (
    <Loader active inline="centered" size="large" className={classes.loading}>
      Loading
    </Loader>
  ) : (
    <Grid>
      <Grid.Row columns={16} style={{ margin: '0 35px' }}>
        <Grid.Column
          xs={12}
          sm={5}
          md={2}
          tablet={5}
          computer={3}
          mobile={16}
          className={classes.channelLeft}
        >
          <div className={classes.userData}>
            <div>
              <Image src="https://harsupesa.am/images/catalog/dj/dj-smoke/dj-smoke-4.jpg" />
              <Link to={``}>
                <span>{data.createdBy}</span>
              </Link>
            </div>
          </div>
          <div className={classes.price}>
            <span>${fields ? price : ''}</span>
            <span className={classes.subPrice}>
              per {fields ? perUnit : ''} {fields ? unit : ''}
            </span>
          </div>
          <div className={classes.tagsContainer}>
            <h2>
              {userType === 'audience_owner'
                ? +data.createdBy === +currentUser.id
                  ? formatMessage(messages.channelTagsTitle)
                  : formatMessage(messages.contentTagsTitle)
                : ''}

              {/*              {                userType === 'content_owner'
                ? formatMessage(messages.channelTagsTitle)
                : formatMessage(messages.contentTagsTitle)}*/}
            </h2>
            <div>
              {data.tags
                ? data.tags.map((tag, index) => (
                    <span key={index} className={classes.tag}>
                      {tag}
                    </span>
                  ))
                : ''}
            </div>
          </div>
          <div className={classes.tagsContainer}>
            <h2>{formatMessage(messages.averageRatingTitle)}</h2>
            <div>Rating</div>
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
              <Link to={''}>
                <span>{formatMessage(messages.offerTitle)}</span>
              </Link>
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
          computer={12}
          tablet={10}
          mobile={16}
          className={classes.rightChannel}
        >
          <Grid.Row>
            <Grid.Column>
              <Image
                src={fields ? imgLink : ''}
                style={{ width: '100%', maxHeight: '590px' }}
              />
            </Grid.Column>
            <Grid.Column>
              <h1 className={classes.title}>{data.title}</h1>
              <div className={classes.channelDescription}>
                <h2>{formatMessage(messages.briefDescriptionTitle)}</h2>
                <p>{data.description}</p>
              </div>
              <iframe
                src={fields ? channelLink : ''}
                frameBorder="0"
                width="100%"
                height="800"
              />

              {/*If there is uploaded music*/}

              {music ? (
                <div>
                  <h2 style={{ fontSize: '22px', textAlign: 'start' }}>
                    {formatMessage(messages.musicTitle)}
                  </h2>
                  <div className={classes.audioContainer}>
                    <audio controls loop={false} autoPlay={false}>
                      <source
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.ogg"
                        type="audio/ogg"
                      />
                    </audio>
                  </div>
                </div>
              ) : (
                ''
              )}
              {video ? (
                <iframe
                  width="560"
                  height="315"
                  src={fields ? videoLink : ''}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                >
                  {' '}
                </iframe>
              ) : (
                ''
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
  );
};
export default DetailsPage;
