import React from 'react';

import SkinLayer from '../skin-layer'
import "./skin-layers.css"

const SkinLayers = ({skinLayers, onDeleted, onToggleHide}) => {
    const elements = skinLayers.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className="skin-layer">
                <SkinLayer {... itemProps}
                onDeleted = {() => onDeleted(id)}
                onToggleHide = {() => onToggleHide(id)}/>
            </li>
        )
    })



    return (
        <div className="d-block p-1 ">
            <h5>SkinLayers</h5>
            <ul className="item-list list-group list-group-flush list-group-item-action">
                {elements}
            </ul>
        </div>
    );
};

export default SkinLayers;