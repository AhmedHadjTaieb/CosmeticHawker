import { Component,ViewChild   } from '@angular/core';
import { AuthData } from '../../providers/auth-data';
import { Chart } from 'chart.js';
import { NavController ,AlertController} from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import { AcceuilPage }from '../acceuil/acceuil';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  public venteA:  FirebaseListObservable <any>;
  public venteB:  FirebaseListObservable <any>;
  public pieChartLabels:  Array<String> ;
  public dataArr = ['ahmed.ht@gmx.com','marouene.abbes@gmail.com'];
  public dataVente =[0,0];
  public libelArr=['ahmed','marouene'];
  public hiddee : boolean;


  constructor(public navCtrl: NavController , public authData: AuthData,public alertCtrl: AlertController, public angFire: AngularFire) {
    this.hiddee = false;

    this.venteA = this.angFire.database.list('ventes', {
      query: {
        orderByChild: 'utilisateur',
        equalTo: this.dataArr[0]
      }
    });

    this.venteA.subscribe( rep => {
      rep.forEach(item => {
          this.dataVente[0]+=(parseInt(item.quantite))
        })
      console.log(this.dataVente[0]);
      });
    this.venteB = this.angFire.database.list('ventes', {
      query: {
        orderByChild: 'utilisateur',
        equalTo: this.dataArr[1]
      }
    });

    this.venteB.subscribe( rep => {
      rep.forEach(item => {
        this.dataVente[1]+=(parseInt(item.quantite))
      })
      console.log(this.dataVente[1]);

    });


  }
  open(){
    this.hiddee = true;
  }
  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.libelArr,
        datasets: [{
          label: '',
          data: this.dataVente,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: this.libelArr,
        datasets: [{
          label: '# of Votes',
          data: this.dataVente,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });




  }



  openAcceuil() {
    this.navCtrl.setRoot(AcceuilPage);

  }
}
