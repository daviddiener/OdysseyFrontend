import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public htmlText = '';
  public text = '';
  private textQueue = [
    'Character: Elira Windwhisper\nAction: Arrived in the city of Frostholme\nDate: 2023-09-08 19:54:11',
    'Character: Arion Stormseeker\nAction: Defeated a dragon in Sunfire Plains\nDate: 2023-09-08 21:10:30',
    'Character: Selene Nightshade\nAction: Discovered a hidden treasure in Darkwood Forest\nDate: 2023-09-08 21:25:47',
    'Character: Gavric Ironfist\nAction: Arrived in the city of Skyreach\nDate: 2023-09-08 21:40:12',
    'Character: Freya Lightbringer\nAction: Travelled through the region of Stormcliff Heights\nDate: 2023-09-08 22:05:19',
    'Character: Eamon Shadowcloak\nAction: Escaped from prison in Golden Fields\nDate: 2023-09-08 22:15:43',
    'Character: Lyra Moonshadow\nAction: Travelled through the region of Moonshade Vale\nDate: 2023-09-08 20:50:56',
    'Character: Thalor Swiftblade\nAction: Travelled through the region of Moonshade Vale\nDate: 2023-09-08 20:47:43',
    'Character: Seraphina Flameheart\nAction: Arrived in the city of Sundew\nDate: 2023-09-08 22:30:00',
    'Character: Orion Starweaver\nAction: Travelled through the region of Crystal Lake\nDate: 2023-09-08 22:45:21'
  ];
  
  
  private index = 0;
  private queueIndex = 0;
  private speed = 40; // speed in milliseconds
  private deleteSpeed = 10; // speed in milliseconds
  private delay = 1000; // delay in milliseconds

  constructor (public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.typeEffect();
  }

  typeEffect(): void {
    if (this.index < this.textQueue[this.queueIndex].length) {
      this.text += this.textQueue[this.queueIndex].charAt(this.index);
      this.htmlText = this.text.replace(/\n/g, '<br>');
      this.index++;
      setTimeout(() => this.typeEffect(), this.speed);
    } else {
      setTimeout(() => this.deleteEffect(), this.delay);
    }
  }
  
  deleteEffect(): void {
    if (this.index > 0) {
      this.text = this.text.substring(0, this.index - 1);
      this.htmlText = this.text.replace(/\n/g, '<br>');
      this.index--;
      setTimeout(() => this.deleteEffect(), this.deleteSpeed);
    } else {
      this.queueIndex = (this.queueIndex + 1) % this.textQueue.length;
      setTimeout(() => this.typeEffect(), this.delay);
    }
  }
}
