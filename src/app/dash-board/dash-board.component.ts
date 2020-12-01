import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  tabledataarray:any

  addRow:boolean=false
  selectedarray=[]
  detailsForm=new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    lastName: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    dateOfBirth: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
    email: new FormControl('',[Validators.required,Validators.email]),
  }) 
  constructor(private service:ServiceService) {
    this.tabledata()
   }

  ngOnInit() {
  }

  tabledata(){
    this.service.getallData().subscribe(res=>{
      console.log(res);
      this.tabledataarray=res
    })
  }

  savedata(){
    console.log(this.detailsForm.value);
    this.service.postdata(this.detailsForm.value).subscribe(res=>{
      this.tabledata()
      this.detailsForm.reset()
    })
  }

  deletedata(id){
    this.service.idbaseddelete(id).subscribe(res=>{
      this.tabledata()
    })
  }

  setData(data){
    this.detailsForm.controls.firstName.setValue(data.firstName)
    this.detailsForm.controls.lastName.setValue(data.lastName)
    this.detailsForm.controls.dateOfBirth.setValue(data.dateOfBirth)
    this.detailsForm.controls.mobile.setValue(data.mobile)
    this.detailsForm.controls.email.setValue(data.email)
  }
  updatedata(id){
    this.service.idbasedupdate(id,this.detailsForm.value).subscribe(res=>{
      this.tabledata()
    })
  }

  selecteddata(event,id){
    if(event.target.checked==true){
      this.selectedarray.push(id)
    }else{
      let data=this.selectedarray.filter(a=>a != id)
      this.selectedarray=data
    }
    console.log(this.selectedarray);
  }

  multipledelete(){
    for(let id of this.selectedarray){
      this.service.idbaseddelete(id).subscribe(res=>{
        this.tabledata()
      })
    }
  }
}
