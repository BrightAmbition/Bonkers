import { Scene } from "phaser";
// import logo from '../assets/load/8.png';

var width = window.innerWidth
var height = window.innerHeight

class Loading extends Scene {
    constructor(props) {
        super(props);
    }
    preload() {

    }
    create() {
        // if (width < height) {
        //     this.cameras.main.rotation = Math.PI / 2;
        // }

        // this.powered = this.add.text(width / 2, height / 2, 'Powered By AWS, Solana', { fontFamily: 'bonkerFont', fontSize: 30, color: '#ffffff' }).setOrigin(0.5, 0.5).setAlpha(0);





    }
    update() {
        this.scene.start('battle');
    }

}
export default Loading;