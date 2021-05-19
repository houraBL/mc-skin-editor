import React from 'react';
//import ReactDOM from 'react-dom';


//import AppHeader from '../app-header';
import TopPanel from '../top-panel';
import SkinLayers from '../skin-layers';
//import Library from '../library';
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
        displayColorPicker: false,
        color: {
          r: '0',
          g: '0',
          b: '0',
          a: '1',
        },
        hexColor : "#000000"
        
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

    onColorChange = (color) => {
        this.setState({ color: color.rgb });
        this.setState({hexColor : color.hex});
    };

    onSwatchClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });        
    }

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
//<Library className = ""/>
        return(
            <div className="app">
                    <TopPanel/>
                  
                
                <div className="row mb2 align-items-top no-gutters align-items-center ">
                    
                    <SkinLayers className="col-md-3"
                                skinLayers={skinLayersData}
                                onDeleted={this.deleteItem}
                                onToggleHide={this.onToggleHide}
                                onToggleChosen={this.onToggleChosen}/>

                    <div className="col-md-7">                        
                        <Redactor skinLayersData={skinLayersData}
                                hexColor={this.state.hexColor}/>
                    </div>
                    <div className="col-md-2 ">
                        
                        <Tools
                            color = {this.state.color}
                            displayColorPicker = {this.state.displayColorPicker}
                            onColorChange = {this.onColorChange}
                            onSwatchClick = {this.onSwatchClick}
                        />
                    </div>
                </div>                
            </div>
        )
    }
}

