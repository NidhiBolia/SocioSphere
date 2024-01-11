import React from 'react';

const UserImage = ({ image, size = '60px' }) => {
  return (
    <div className={`w-${size} h-${size}`}>
      <img
        className={`w-${size} h-${size} object-cover rounded-full`}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
