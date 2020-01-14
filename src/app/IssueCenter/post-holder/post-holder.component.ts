import { PostComponent } from './../post/post.component';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-post-holder',
  templateUrl: './post-holder.component.html',
  styleUrls: ['./post-holder.component.css']
})
export class PostHolderComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: max-line-length
  public data1  = 'The decision of the incumbent government to terminate the agreement to acquire 14 modern aircraft for SriLankan Airlines, which was signed during the Mahinda Rajapaksa government, had resulted in staggering losses amounting to a sum of US$ 115.77 million (Rs 17,058 .1 million), Parliamentary Committee on Public Enterprises (COPE) report submitted to parliament said today.';
  // tslint:disable-next-line: max-line-length
  public data2  = ' “Most days we are lucky if just one group turns up. For three months we had nobody and spent the day sitting around playing cards. There were initially seven of us but things got so bad that two of the men left because they needed to earn money for their families,” said Kumara. “Before the Easter attacks, we could easily make £100 a day between us.';
  // tslint:disable-next-line: max-line-length
  public data3  = 'The special three-member committee appointed by President Maithripala Sirisena to investigate the April 21 bombing yesterday said state intelligence services should be made an independent body while it should be governed by legislation.At yesterday’s Cabinet meeting, President Maithripala Sirisena is reported to have sought time till January next year to approve the agreement with the US Millennium Challenge Corporation (MCC) but Prime Minister Ranil Wickremesinghe had insisted it should be signed as soon as possible.ould come under the Education Ministry, the Education Minister Akila Viraj Kariyawasam said.';


  public title1 = 'This is title one ';
  public title2 = 'This is title two ';
  public title3 = 'This is title three and final ';


  // tslint:disable-next-line: max-line-length
  public posts = [['Kalana Mihiranga',  './../../assets/11.jpg', this.data1.substring(0, 380) +"..." , 5   , '2019/03/12' , 'solved' , '123' , this.title1],
                  ['Pawani Imalsha',  './../../assets/22.jpg', this.data2.substring(0, 380) +"..."    , 2     , '2019/03/12', 'unsolved', '323', this.title2],
                  ['Hashini Isharaa' ,  './../../assets/33.jpg', this.data3.substring(0, 380) +"..."   , 3 , '2019/03/12',  'solved', '567' , this.title3],];

  ngOnInit() {
  }
  
  showResults = false;

  searchChanged(query) {
    if (query.length) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }

  

}
