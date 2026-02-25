import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// import imageSrc from '../../Assets/images/user1.jpg';
const CommentCard = ({ name, image, description }) => {
    const { t } = useTranslation();
    // const imageSrc = require(`/src/Assets/images/${image}`);
  return (
    <StyledWrapper>
      <div className="card">
        {/* <div className="img" style={{ backgroundImage: `url(${imageSrc})` }} /> */}
        <span>{name}</span>
        <p className="info">{t(description)}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 17em;
    height: 21em;
    background: #171717;
    transition: 0.4s ease-in-out;
    clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    gap: 0.5em;
    margin: 40px 10px;
  }

  .card span {
    font-weight: bold;
    color: white;
    text-align: center;
    font-size: 1.2em;
  }

  .card .info {
    font-weight: 400;
    color: white;
    text-align: center;
    font-size: 0.9em;
    margin: 0.5em;
  }

  .card .img {
    width: 4.8em;
    height: 4.8em;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-top: 10px;
  }
`;

export default CommentCard;
