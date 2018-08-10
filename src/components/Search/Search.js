import React from 'react';
import { Field } from 'redux-form';

import RenderField from './RenderField';

const Search = ({ classes }) => {
  return (
    <div className="search-wrapper">
      <Field
        name="search"
        component={RenderField}
        type="search"
        label="search"
        bsSize="large"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
