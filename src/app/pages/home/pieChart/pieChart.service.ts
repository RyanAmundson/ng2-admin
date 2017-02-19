import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider,private http: Http) {
  }
  getData():any {
    console.log("getting data");

    return this.http.get("http://bpri.ryanamundson.com/SalishSea/v0.5/server/admin.php?data=totals").toPromise()
                  .then((res) =>{ return this.extractData(res)})
                  .catch(this.handleError);
  }
  private extractData(res: Response) {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let body = res.json();
    console.log(body)
    return [
      {
        color: pieColor,
        description: 'Issues',
        stats: body.Issues,
        icon: 'list',
      },
            {
        color: pieColor,
        description: 'Categories',
        stats: body.Categories,
        icon: 'book',
      }, {
        color: pieColor,
        description: 'Policy Actors',
        stats: body.PolicyActors,
        icon: '',
      }, {
        color: pieColor,
        description: 'Laws and Agreements',
        stats: body.LawsAgreements,
        icon: 'book',
      },

    ];
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
