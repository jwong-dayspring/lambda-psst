import { Component, Renderer2 } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import '../../sass/styles.scss';

@Component({
  selector: 'my-app',
  template: require('./app.component.html')
})
export class AppComponent {
  private hoverTest: Function;
  private touchTest: Function;

  constructor(private renderer: Renderer2, private $log: Logger) { 
    this.touchTest = this.renderer.listen('window', 'touchstart', (evt) => {
      this.$log.log('Setting touch interface');
      window.TOUCH_INTERFACE = true;
      this.touchTest();
   });
   this.hoverTest = this.renderer.listen('window', 'mouseover', (evt) => {
     this.$log.log('Setting hover interface');
     window.HOVER_INTERFACE = true;
     this.hoverTest();
   });
  }

  ngOnDestroy() {
    this.hoverTest();
    this.touchTest();
  }

  resetScores() {
    this.$log.info('reset');
    return false;
  }
  addScores(text: String) {
    this.$log.info(text);
    return false;
  }
}
