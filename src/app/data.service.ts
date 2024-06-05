import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Model, Option, State, Config, Color } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://interstate21.com/tesla-app/images/';
  finalURL: Observable<string> = of('');
  dataFromApi: Model[] = [];
  dropDownConfigs: Config[] = [];
  dropDownColors: Color[] = [];
  selectedData: State = {
    'model': 'Choose',
    'color': '',
    'colorprice': 0,
    'colorcode': '',
    'config': 'Choose',
    'code': '',
    'range': '',
    'maxSpeed': '',
    'cost': 0,
     'tow' : {
      'isTowAvailable' : false,
      'isTowSelect': false,
      'towHitchCost': 0,
     },
     'yoke':{
      'isYokeAvailable' : false,
      'isYokeSelect': false,
      'toYokeCost': 0,
     }
  }
  constructor(private http: HttpClient) { }

  getModel(): Observable<Model[]> {
    return this.http.get<Model[]>('/models');
  }

  getOption(id: string): Observable<Option> {
    return this.http.get<Option>('/options/' + id);
  }

  getImages(code: string, colorcode: string): void {
    this.finalURL = of(this.url + code + '/' + colorcode + ".jpg");
  }

  updateState(modifiedData: Array<object>, tow?:boolean, yoke?:boolean): void {
    modifiedData.forEach((data: object) => {
      let key = Object.keys(data)[0];
      let value = Object.values(data)[0];
      tow ? this.selectedData.tow[key] = value : yoke ? this.selectedData.yoke[key] = value : this.selectedData[key] = value;
    })
  }

  resetState(): void {
    this.selectedData['color'] = '';
    this.selectedData['colorcode'] = '';
    this.selectedData['colorprice'] = 0;
    this.selectedData['config'] = 'Choose';
    this.selectedData['range'] = '';
    this.selectedData['cost'] = 0;
    this.selectedData['maxSpeed'] = '';
    this.selectedData.tow['isTowSelect']= false;
    this.selectedData.tow['towHitchCost'] = 0;
    this.selectedData.yoke['isYokeSelect'] = false;
    this.selectedData.yoke['toYokeCost'] = 0;
    this.finalURL = of('');
  }
}
