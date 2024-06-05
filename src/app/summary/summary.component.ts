import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  constructor(private dataService: DataService) { }
  selectedData = this.dataService.selectedData;
}
