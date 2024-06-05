import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Model, Color } from '../interfaces';

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})


export class ModelAndColorComponent implements OnInit {
  selectedData = this.dataService.selectedData;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    if (this.selectedData['model'] == 'Choose' && this.selectedData['color'] == '') {
      this.dataService.getModel().subscribe((m: Model[]) => {
        let data = this.dataService.dataFromApi;
        if (data) {
          m.forEach((d: Model) => {
            data.push({
              description: d.description,
              code: d.code,
              colors: d.colors,
              option: {
                configs: [],
                towHitch: false,
                yoke: false
              }
            });
          })
        }
      })
    }
  }

  selectedModel(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if (value) {
      this.dataService.resetState();
      let item = this.dataService.dataFromApi.filter((i: Model) => i.description === value)[0];
      this.dataService.updateState([{ 'model': value }, { 'code': item.code }, { 'color': item.colors[0].description }])
      this.dataService.dropDownColors = item.colors;
      this.setColorData(item.colors[0].description);
    }
  }

  setColorData(value: string) {
    let data = this.dataService.dropDownColors.filter((i: Color) => i.description == value)[0];
    if (data) {
      this.dataService.updateState([{ 'color': value }, { 'colorprice': data.price > 0 ? data.price : 0 }, { 'colorcode': data.code }])
    }
    this.dataService.getImages(this.selectedData.code, this.selectedData.colorcode);
  }

  selectedColor(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if (value) {
      this.setColorData(value);
    }
  }
}


