import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TrafficChartService {

  constructor(private _baConfig:BaThemeConfigProvider,private http: Http) {
  }


  getData():any {
    console.log("getting data")

    return this.http.get("http://bpri.ryanamundson.com/SalishSea/v0.5/server/admin.php?data=totals").toPromise()
                  .then((res) =>{ return this.extractData(res)})
                  .catch(this.handleError);
    

  }

  private extractData(res: Response) {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    let body = res.json();
    console.log(body)
    return[
        {
          value: body.Issues,
          color: dashboardColors.white,
          highlight: colorHelper.shade(dashboardColors.white, 15),
          label: 'Issues',
          percentage: 87,
          order: 1,
        }, {
          value: body.PolicyActors,
          color: dashboardColors.gossip,
          highlight: colorHelper.shade(dashboardColors.gossip, 15),
          label: 'Search engines',
          percentage: 22,
          order: 4,
        }, {
          value: body.LawsAgreements,
          color: dashboardColors.silverTree,
          highlight: colorHelper.shade(dashboardColors.silverTree, 15),
          label: 'Referral Traffic',
          percentage: 70,
          order: 3,
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
