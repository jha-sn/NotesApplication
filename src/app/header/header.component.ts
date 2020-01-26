import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() childMessage: any=[];
  allNotes: any;
  date: Date;
  time: any;
  searchData;
  constructor(private sharedservice: SharedService) { }

  ngOnInit() {
  this.date = new Date();
  this.time = this.date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  console.log(this.date.getTime())
  }
  onCreateClick() {
this.sharedservice.isCreateClicked.next(true);
  }
  onDeleteClick() {
    this.allNotes = JSON.parse(localStorage.getItem('allNotes'));
    this.allNotes.map(ele=>{
      if(this.childMessage.id == ele.id){
        let index = this.allNotes.indexOf(ele);
        this.allNotes.splice(index,1);
      }
    })
    console.log('this.allNotesdeleted', this.allNotes)
    localStorage.setItem('allNotes', JSON.stringify(this.allNotes));
    this.sharedservice.isDeleteClicked.next(true);
  }
  search(data) {
    console.log(data,'data')
    this.searchData = data;
    this.sharedservice.isSearchClicked.next(true);

  }
}
