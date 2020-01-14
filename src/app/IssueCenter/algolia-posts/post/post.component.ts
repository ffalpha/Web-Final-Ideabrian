import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent  {

  @Input() name: string;
  @Input() url: string;
  @Input() content: string;
  @Input() rating: string;
  @Input() date: string;
  @Input() solved: string;
  @Input() id: string;
  @Input() title: string;
  @Input() category:string;
  @Input() uuid:string;

  public cleanText;
  public readMoreLink;

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    if( this.content!=null){
      this.cleanText = this.content.replace(/<\/?[^>]+(>|$)/g, "").replace(" ","&nbsp;").replace(" ","&nbsp;").replace(" ","&nbsp;").replace(" ","&nbsp;").replace(" ","&nbsp;").replace(" ","&nbsp;").substring(0, 400) + ' ...';
      console.log(this.cleanText);

      this.readMoreLink = `/../readMore/${this.category}/${this.uuid}`;
      console.log("post component: ",this.readMoreLink);
    }
    
  }


}
