import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../styles/grapes.css';
import 'grapesjs/dist/css/grapes.min.css';

import React from 'react';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-webpage';
import basic from 'grapesjs-blocks-basic';
import forms from 'grapesjs-plugin-forms';
import pgexport from 'grapesjs-plugin-export';
import { Button } from 'semantic-ui-react';

export default class Home extends React.Component {
  constructor(props:any){
    super(props);
    this.state = {
      zIndex:1
    } as {
      editor?: any,
      zIndex:number
    }
  }

  componentDidMount(): void {
    const editor:any = grapesjs.init({
        fromElement: true,
        container: '#gjs',
        storageManager: {
            type: 'local',
            autoload: true,
            autosave: true,
            stepsBeforeSave: 1,
        },
        plugins: [
            basic, plugin, forms, pgexport
        ],
        pluginsOpts: {
            pgexport: {
                css: {
                    'style.css': (ed:any) => ed.getCss(),
                    'some-file.txt': 'My custom content',
                },
                img: async (ed:any) => {
                    const images = await ed.getComponents();
                    return images;
                },
                'index.html': (ed:any) => `<body>${ed.getHtml()}</body>`
            },
        },
        canvas: {
            styles: ['https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i|Open+Sans:300,300i,400,400i,500,500i,700,700i|Lato:300,300i,400,400i,500,500i,700,700i|Montserrat:300,300i,400,400i,500,500i,700,700i|Oswald:300,300i,400,400i,500,500i,700,700i|Source+Sans+Pro:300,300i,400,400i,500,500i,700,700i|Slabo+27px/13px:300,300i,400,400i,500,500i,700,700i|Raleway:400,400i,700,700i|&subset=latin,latin-ext']
        }
    });
    this.state = editor;
  }

  export = () => {
      const editor:any = this.state;
      editor.runCommand('gjs-export-zip');
  }

  render(){
    return (
      <>
        <Button onClick={() => this.export()} className="page_save" primary>Save</Button>
        <div id="gjs"></div>
      </>
    )
  }
}
