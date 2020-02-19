import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { selector } from "../../common/catagory";

//file upload related imports
import { AngularFireStorage } from "@angular/fire/storage";
import { forkJoin } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router} from '@angular/router';

//UUID for documnet id's
import * as uuid from "uuid";

//getting user related data 
import { UserDetailsService} from "../../common/user-details.service"; 
@Component({
  selector: "app-post-writer",
  templateUrl: "./post-writer.component.html",
  styleUrls: ["./post-writer.component.css"]
})
export class PostWriterComponent implements OnInit {

  private editorContent; // inner HTML in editor window
  private editorForm: FormGroup; //main form with title , description  
  private postCatagory; //podt category 
  private postCatagoryLovercase; //usefull in frontend title 
  private imageID;//<--not used here
  private databaseName; // collection name to add document 
  private userObject;// To store the users details



  constructor(private route: ActivatedRoute,private afs: AngularFirestore,private storage: AngularFireStorage,private router:Router,private user:UserDetailsService) {
    this.user.getUser().subscribe(
      async doc => { 
          this.userObject  = await doc.data();  
          console.log( JSON.stringify(this.userObject) );    
      }
    );
  }
   
  // editor properties
  editorStyle = { height: "300px" };
  editorConfig = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["clean"] // remove formatting button
    ]
  };

   
  ngOnInit() {
  
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
      title: new FormControl(null)
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
     
      /*
      console.log("ID is not null");
      console.log(parseInt(this.route.snapshot.paramMap.get("id")));
      console.log(selector.select (parseInt(this.route.snapshot.paramMap.get("id"))).toLowerCase());
      */

      var id = parseInt(this.route.snapshot.paramMap.get("id"));
      this.postCatagory = selector.select(id);
      this.databaseName = this.postCatagory.replace(" ", "_").replace(" ", "_");
      this.postCatagoryLovercase = this.postCatagory.toLowerCase(); //used in  the title 
     
    } else {
      this.postCatagory = "error";
      console.log("error occured while selecting a category ")
    }
  
  }  


  //file upload related 
  onClickMe() {
    const realFileBtn = document.getElementById("real-file"); //mapping the file button on frontend to the real upload button
    realFileBtn.click();//trigger real file upload button's click event 
  }

  validateFile(e) {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      //less than one Mb
      var message = "Selected file is larger than 1Mb";
      console.log("File size :- " + file.size + " " + message);
      return message;
    } else {
      if (
        !( //supported file types 
          file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png"
        )
      ) {
        var message = "Selected file is not a image";
        return message;
      }
    }
    return "fine";
  }

  onFileChanged(e) { //change the text according to the file uploaded 
    const customTxt = document.getElementById("custom-text");//customTxt is the label associzted with the file upload
    const realFileBtnValue = (document.getElementById(
      "real-file"
    ) as HTMLInputElement).value;

    //clear exixtingText
    if (customTxt.innerHTML != "No file chosen, yet.") {
      customTxt.innerHTML = " ";
    }

    var validityOfTheFile = this.validateFile(e);
    if (realFileBtnValue) {
      if (validityOfTheFile === "fine") {
        customTxt.innerHTML = realFileBtnValue.match(
          /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
        //set the file URL
        this.file = e.target.files.item(0);
      } else {
        //remove files which failed the validation
        (document.getElementById("real-file") as HTMLInputElement).value = null;
        customTxt.innerHTML = validityOfTheFile.toLowerCase();
      }
    } else {
      customTxt.innerHTML = "No file choosen yet.";
    }

  }



  onSubmit() {
    this.editorContent = this.editorForm.get("editor").value;
  }

  maxLength(event) {
    this.editorContent = this.editorForm.get("editor").value;
  }

  //file upload related-----------------------------------------------------------------------------------

  private fileRef; //local file reference of the url
  private file: File; // the actual file

  uploadFile(file: File) {
    const fileName = file.name;
    const filePath = `uploads/${fileName}.${file.name.split(".").pop()}`;
    const cacheControl = "max-age=3600;";
    this.fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file, { cacheControl });
    return forkJoin(task.snapshotChanges()).pipe(
      mergeMap(() => this.fileRef.getDownloadURL()),
      map(url => url as string)
    );
  }
  //---------------------------------------------------------------------------------------

  uploadNow() {
    console.log("Upload now clicked");
    let file = this.file;
    this.uploadFile(file).subscribe(
      e => {
        console.log("Uploading ");
      },
      error => {
        console.log(" Error ", error);
      },
      () => {
        const promise = this.fileRef.getDownloadURL().toPromise();
        promise.then(result => {
          //what should happen when uploading the file
          console.log(result);
          let dateTime = new Date();
          var creationDate =
            dateTime.getFullYear() +
            "/" +
            (dateTime.getMonth()+1) +
            "/" +
            dateTime.getDate();
          var titleOfThePost = (document.getElementById(
            "title"
          ) as HTMLInputElement).value;

          //image is placed under the folder at the catagory selection
          const uniqueID = uuid.v4();
          const user = JSON.parse(localStorage.getItem('user'));
          const uid = user['uid'].replace('"', "").replace('"', "")  
          const post = {
            //uploader related data
            name: this.userObject["displayName"],  
            body: this.editorForm.get("editor").value,
            profilePic: this.userObject["photoURL"], 
     
            date: creationDate,
            status: "unsolved",
            title: titleOfThePost,
            image: result, // this should be the image of the uploader but currently it's the image  related  to the post
            category: this.databaseName,
            uuid: uniqueID,
            uid: uid ,//uid of the writer
            comments: {0 : 0}
          };

          this.afs.collection(this.databaseName).doc(uniqueID).set(post); //other than above mentioned errors others look good
          const urlPart = parseInt(this.route.snapshot.paramMap.get("id"));

          //navigate to the search page 
          this.router.navigate([`a/${urlPart}`]);
        });
        
      }
    );
  } 
}
