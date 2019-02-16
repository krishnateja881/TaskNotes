import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  enteredText: string;
  itemValues=[];
  filteredItems =[];
  dateValue = Date.now();
  info:String = "This is a static text";
  id=0;
  information:any;
  currentSelectedId:any;
  selectedPosition:any
  isInputTextEnter= false;

  constructor(private fb: FormBuilder,protected localStorage: LocalStorage){
    console.log("fsfgfsgsfg")
    this.localStorage.getItem('allNotes').subscribe((notes:[{}]) => {
      if(notes){
        this.itemValues = notes;
        this.filteredItems =this.itemValues;
      }
    });
  }

  ngOnInit = () => {
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.itemValues);
  }

  /**
   * Searching for a task from the list
   * @param value
   */
  filterItem(value) {
    if (!value) {
      this.assignCopy();// when nothing has typed
    }
    this.filteredItems = Object.assign([], this.itemValues).filter(
      item => item.data.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  /**
   * Saving the task entry
   */
  save(){
    this.information={
      id:this.id,
      data:this.enteredText,
      date:Date.now(),
      info:this.info
    }
    this.itemValues.push(this.information);
    this.id++;
    this.filteredItems = this.itemValues;
    this.localStorage.setItem("allNotes",this.itemValues).subscribe(() => {});
    console.log(this.itemValues);
    this.enteredText ='';
    this.isInputTextEnter = false;

  }

  /**
   * Remove a Task from the list
   */
  remove(){
    this.itemValues.splice(this.selectedPosition,1);
    this.filteredItems= this.itemValues;
    this.enteredText = '';
    this.localStorage.setItem("allNotes",this.itemValues).subscribe(() => {});
  }

  /**
   * selected a task and its position
   * @param id
   * @param index
   */
  getInfoData(id,index){
    this.currentSelectedId = id;
    this.selectedPosition = index;
    this.filteredItems.forEach((value)=>{
      if(value.id==id){
        this.enteredText = value.data;
      }
    })
  }

  /**
   *
   */
  enterTextValue(){
    this.enteredText = "New Note"
    this.isInputTextEnter = true;
  }


}
