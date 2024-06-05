import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [DataService],
  styleUrl:'./app.component.scss',
  imports: [AsyncPipe, JsonPipe, CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Angular';
  model = {};
  step3 = false;
  constructor(public dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.routeToPage('step1');
  }

  routeToPage(page: string) : void {
    this.router.navigate(['/' + page])
  }

  disablePage(page: string) : boolean {
    let select = this.dataService.selectedData;
    if (page === '2' && select.model !== 'Choose' && select.color !== '') {
      return false;
    } else if (page === '3' && select.model !== '' && select.color !== '' && select.config !== 'Choose') {
      return false;
    } else {
      return true;
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
  }
}
