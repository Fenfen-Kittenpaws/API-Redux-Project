import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/Spots';
import { Link } from 'react-router-dom';

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.items);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spots-list">
      {spots.map(spot => (
        <div key={spot.id} className="spot-tile">
          <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name} className="spot-image" />
            <div className="spot-info">
              <p>{`${spot.city}, ${spot.state}`}</p>
              <p>{spot.price} per night</p>
              <p>Rating: {spot.avgRating || 'New'}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Spots;
