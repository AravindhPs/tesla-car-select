import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Model, Option, Config } from '../interfaces';

@Component({
  selector: 'app-config-and-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config-and-options.component.html',
  styleUrl: './config-and-options.component.scss'
})
export class ConfigAndOptionsComponent implements OnInit {
  selectedData = this.dataService.selectedData;
  constructor(public dataService: DataService) {
  }

  setValues(getItem: Model, m: Option) {
    getItem.option['configs'] = m.configs;
    getItem.option['towHitch'] = m.towHitch;
    getItem.option['yoke'] = m.yoke;
    this.dataService.updateState([{ 'isTowAvailable': m.towHitch }], true, false)
    this.dataService.updateState([{ 'isYokeAvailable': m.yoke }], false, true)
    this.dataService.dropDownConfigs = m.configs;
  }

  ngOnInit(): void {
    let getItem = this.dataService.dataFromApi.filter((i: Model) => i.code == this.selectedData['code'])[0];
    if (getItem && getItem.option.configs.length == 0) {
      this.dataService.getOption(this.selectedData['code']).subscribe((m: Option) => {
        this.setValues(getItem, m)
      })
    } else {
      this.setValues(getItem, getItem.option);
    }
  }

  setTowValue(isSelect: boolean, cost: number): void {
    this.dataService.updateState([{ 'isTowSelect': isSelect }, { 'towHitchCost': cost }], true, false)
  }

  setYokeValue(isSelect: boolean, cost: number): void {
    this.dataService.updateState([{ 'isYokeSelect': isSelect }, { 'toYokeCost': cost }], false, true)
  }

  checked(event: Event): void {
    let id = (event.target as HTMLInputElement).id;
    if (id && id == 'towHitch') {
      (event.target as HTMLInputElement).checked ? this.setTowValue(true, 1000) : this.setTowValue(false, 0);
    } else {
      (event.target as HTMLInputElement).checked ? this.setYokeValue(true, 1000) : this.setYokeValue(false, 0);
    }
  }

  selectedConfig(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if (value) {
      let getItem = this.dataService.dataFromApi.filter((i: Model) => i.code == this.selectedData['code'])[0].option.configs.filter((j: Config) => j.description === value)[0];
      this.dataService.updateState([{ 'config': value }, { 'range': getItem.range },
      { 'maxSpeed': getItem.speed }, { 'cost': getItem.price }])
    }
  }
}
