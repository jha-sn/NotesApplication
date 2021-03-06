
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CreateNoteComponent } from './../create-note/create-note.component';
import { HeaderComponent } from './../header/header.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {
  @ViewChild(HeaderComponent, { static: false }) header;
  @ViewChild(CreateNoteComponent, { static: false }) createNote;

  noteDefaultTime: string;
  isText: boolean;
  changeSubscription: any;
  changeCreateSubscription: any;
  newNote: any;
  selectedNoteData: string;
  selectedNoteToDelete: any = [];
  changeDelSubscription: any;
  changeSearchSubscription: any;
  searchInput: any;
  notes: { id: string; noteTime: string; noteTitle: string; noteText: string; }[];
  constructor(private sharedService: SharedService) {
    if (localStorage.getItem('allNotes')) {
      this.notes = JSON.parse(localStorage.getItem('allNotes'));
    } else {
      this.notes = [
        { id: '1', noteTime: '4:20 PM', noteTitle: 'note1', noteText: 'newURI notes first' },
        { id: '2', noteTime: '4:20 PM', noteTitle: 'note2', noteText: 'newURI notes second' },
        { id: '3', noteTime: '4:20 PM', noteTitle: 'note3', noteText: 'newURI notes third' },
        { id: '4', noteTime: '4:20 PM', noteTitle: 'note4', noteText: 'newURI notes fourth' },
        { id: '5', noteTime: '4:20 PM', noteTitle: 'note5', noteText: 'newURI notes fifth' },
        { id: '6', noteTime: '4:20 PM', noteTitle: 'note6', noteText: 'newURI notes sixth' },
        { id: '7', noteTime: '4:20 PM', noteTitle: 'note7', noteText: 'newURI notes seventh' },
      ];
    }
  }

  ngOnInit() {
    var time = new Date();
    this.noteDefaultTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    this.changeSubscription = this.sharedService.isChanged.subscribe(resp => {
      if (resp == true) {
        //this.notes.unshift({ id: (this.notes.length + 1).toString(), noteTime: this.noteDefaultTime, noteTitle: 'New Note', noteText: 'No additional text' });
        localStorage.setItem('allNotes', JSON.stringify(this.notes));
      }
    })
    this.changeCreateSubscription = this.sharedService.isCreateClicked.subscribe(resp => {
      if (resp == true) {
       this.notes.unshift({ id: (this.notes.length + 1).toString(), noteTime: this.noteDefaultTime, noteTitle: this.newNote, noteText: 'No additional text' });
        localStorage.setItem('allNotes', JSON.stringify(this.notes));
      }
    });
    this.changeDelSubscription = this.sharedService.isDeleteClicked.subscribe(resp => {
      if (resp == true) {
        this.notes = JSON.parse(localStorage.getItem('allNotes'));
      }
    });
    this.changeSearchSubscription = this.sharedService.isSearchClicked.subscribe(resp => {
      if (resp == true) {
        this.searchInput = this.header.searchData;
      }
    });

  }
  ngAfterViewInit() {
    this.isText = this.createNote.isText;

  }
  // Binding textbox value to the side bar note
  public textBind(data: any): void {
    this.notes.map(x => {
      if (x.id == (this.notes.length).toString()) {
        if (data == '') {
          x.noteTitle = 'New Note';
        } else {
          x.noteTitle = data;
          this.newNote = data;
        }
      }
    });
  }
  //Binding selected note to textarea
  public onNoteSelection(data: any): void {

    this.selectedNoteData = data.noteTitle;
    this.selectedNoteToDelete = data;
  }
}
