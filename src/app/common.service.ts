import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private GET_BOARD = "https://www.qlsacademy.com/api/board/"
  private GET_MEDIUM="https://www.qlsacademy.com/api/medium/?board_id="
  private GET_STANDARD="https://www.qlsacademy.com/api/standard/?medium_id="
  private POST = "https://www.qlsacademy.com/api/students/";
  
  constructor(private http : HttpClient) { }

  getBoard(){
    return this.http.get(this.GET_BOARD)
  }

  getMediumUsingBoardId(id){
    return this.http.get(this.GET_MEDIUM+id)
  }

  getStandardUsingMediumId(id){
    return this.http.get(this.GET_STANDARD+id)
  }

  post(data:any){
    return this.http.post(this.POST,data)
  }
}
