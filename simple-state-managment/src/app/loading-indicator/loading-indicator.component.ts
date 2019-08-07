import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
