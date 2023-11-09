import { Component, Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-loadingoverlay',
  templateUrl: './loadingoverlay.component.html',
  styleUrls: ['./loadingoverlay.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayComponent implements OnDestroy {
  public isLoading = false;
  loadingTexts: string[] = [
    'Spinning up Servers',
    'Counting to Infinity',
    'Chasing Fireflies',
    'Finding Atlantis',
    'Teaching Penguins to Fly',
    'Searching for Bigfoot',
    'Transmitting Thoughts',
    'Mixing Magic Potions',
    'Wrestling with Robots',
    'Hunting for Buried Treasure',
    'Convincing Cats to Dance',
    'Brewing a Storm in a Teacup',
    'Cracking Secret Codes',
    'Tickling Turtles',
    'Launching a Potato into Space',
    'Painting a Masterpiece',
    'Building a Sandcastle',
    'Making a Wish',
    'Catching a Shooting Star',
    'Inventing Time Travel',
  ];
  currentLoadingTextIndex: number = 0;

  private autoCycleSubscription: Subscription;

  constructor() {
    // Automatically cycle loading text every 5 seconds
    this.autoCycleSubscription = interval(5000).subscribe(() => {
      this.cycleLoadingText();
    });
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to avoid memory leaks
    this.autoCycleSubscription.unsubscribe();
  }

  // Function to cycle through loading texts
  cycleLoadingText() {
    this.currentLoadingTextIndex =
      (this.currentLoadingTextIndex + 1) % this.loadingTexts.length;
  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }
}
