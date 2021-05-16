import React from 'react';
//import ReactDOM from 'react-dom';


import AppHeader from '../app-header';
import TopPanel from '../top-panel';
import SkinLayers from '../skin-layers';
import Library from '../library';
import Redactor from '../redactor';
import Tools from '../tools';

import './app.css';


export default class App extends React.Component {
    maxId = 100;
    state = {
        skinLayersData: [
            this.createSkinLayer('main Layer', '', true ),
            this.createSkinLayer('maid HBomb94', 'https://texture.namemc.com/ae/fc/aefc9682a40ebaf0.png' ),
            this.createSkinLayer('Ramboob', 'https://texture.namemc.com/c8/68/c86868b8b045944d.png' ),
        ],
        
    }

    createSkinLayer(label, src, isMain) {
        if(isMain === undefined){
            return {
                label,
                id: 'l' + this.maxId++,
                src,
                visible: true,
                chosen: false,
                isMain: false,
            }
        } else {                
            return {
                label,
                id: 'l' + this.maxId++,
                src,
                visible: true,
                chosen: false,
                isMain
            }
        }
    }


    onToggleHide = (id) => {
        this.setState(({ skinLayersData }) => {
            return {
                skinLayersData: this.toggleProperty(skinLayersData, id, 'visible') 
            };
        });
    };

    onToggleChosen = (id) => {
        this.setState(({ skinLayersData }) => {
            return {
                skinLayersData: this.toggleProperty(skinLayersData, id, 'chosen')
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem,
          [propName]: !oldItem[propName]};
    
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    deleteItem = (id) => {
        this.setState(({skinLayersData}) => {
            const index = skinLayersData.findIndex((el) => el.id === id);
            const newSkinLayersData = [
                ...skinLayersData.slice(0, index),
                ...skinLayersData.slice(index + 1)
            ];
            return {
                skinLayersData: newSkinLayersData
            };
        });
    };

    render() {
        const {skinLayersData,} = this.state;
        //const visibleLayers = skinLayersData.filter((el) => el.visible);

        return(
            <div className="app">
                    <AppHeader/>
                    <TopPanel/>
                
                <div className="row mb2 align-items-top no-gutters">
                    <Library className = "col-1"/>
                <SkinLayers className="col-2"
                                skinLayers={skinLayersData}
                                onDeleted={this.deleteItem}
                                onToggleHide={this.onToggleHide}
                                onToggleChosen={this.onToggleChosen}/>

                    <div className="col-7">
                        <Redactor skinLayersData={skinLayersData}/>
                    </div>
                    <div className="col-2 ">
                        <Tools/>
                    </div>
                </div>                
            </div>
        )
    }
}

