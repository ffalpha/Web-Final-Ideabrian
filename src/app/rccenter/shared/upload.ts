export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    uploader: string;
    type: string;
    progress: number;
    createdAt: Date = new Date();
  id: any;
     constructor(file: File) {
       this.file = file;
     }

}
