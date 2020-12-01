import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
 
  getallData(){
    return this.http.get("http://localhost:3000/pluralTask")
  }
  postdata(data){
    return this.http.post("http://localhost:3000/pluralTask",data)
  }

  idbasedupdate(id,data){
    return this.http.put("http://localhost:3000/pluralTask/"+id,data)
  }
  idbaseddelete(id){
    return this.http.delete("http://localhost:3000/pluralTask/"+id)
  }

}
