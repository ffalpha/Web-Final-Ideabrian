export interface Notification {
    title: string;  //title of the question
    postedBy: string; //person who posted the question 
    uid:string; //user id of the poested person
    time: string; //date of the posted question
    url:string;  //url to the document 
    seen:boolean; //seen unseen status
    id:string; //uid of the document 
  }
  