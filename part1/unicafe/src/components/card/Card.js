import React from 'react';
import './card.css';
import Button from '../button/Button';

const Card = ({ option, stat, btnClass, click }) => (
    <div className="card" onClick={ click }>
        <Button addClass={ btnClass } text={ option }/>
        <p className="stat">{ stat }</p>
        <p className="others">People think we're <br /> { option }</p>
    </div>
);

export default Card;