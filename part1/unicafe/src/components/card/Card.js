import React from 'react';
import './card.css';
import Button from '../button/Button';

const Card = ({ option, stat, btnClass, click, statClass, othersClass }) => (
    <div className="card" onClick={ click }>
        <Button addClass={ btnClass } text={ option }/>
        <p className={ statClass }>{ stat }</p>
        <p className={ othersClass }>Person(s) think we're <br /> { option }</p>
    </div>
);

export default Card;