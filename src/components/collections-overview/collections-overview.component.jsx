import React,{useContext} from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';

// import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';

import CollectionsContext from '../../contexts/collections/collections.context'

const CollectionsOverview = () => {
  const collectionsMap = useContext(CollectionsContext)
  const collections =Object.keys(collectionsMap).map(key => collectionsMap[key])
  return(
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);
    }

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollectionsForPreview
// });

export default CollectionsOverview
