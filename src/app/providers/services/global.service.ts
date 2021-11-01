import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  login(value: any) {
    throw new Error('Method not implemented.');
  }
  public userData: any = null
  public isAuthed = false
  public isAdmin = false
  public imgUrl = "http://medical.marwaradwan.org/storage/app/public/"
  apiMainUrl = "http://localhost:3000/"
  constructor(private _http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this._http.get('http://medical.marwaradwan.org/api/auth/loadRoles/1')
  }

  registerUser(user: any): Observable<any> {
    console.log(user)
    return this._http.post(`${this.apiMainUrl}user/register`, user)
  }

  loginUser(user: any): Observable<any> {
    return this._http.post(`${this.apiMainUrl}user/login`, user)
  }
  profile(): Observable<any> {
    return this._http.get(`${this.apiMainUrl}user/profile`)
  }
  showAllUsers(): Observable<any> {
    return this._http.get(`${this.apiMainUrl}user/showall`)
  }
  addUsers(user: any): Observable<any> {
    return this._http.get(`${this.apiMainUrl}user/adduser`)
  }
  addProject(project: any): Observable<any> {
    return this._http.get(`${this.apiMainUrl}project/add`)
  }

  addImg(file: any): Observable<any> {
    // const myData = new FormData()
    // myData.append("img",file,  file.name)
    return this._http.post(`${this.apiMainUrl}user/addImg`, file)
  }
  logout(): Observable<any> {
    // console.log('t2')
    return this._http.post(`${this.apiMainUrl}user/logout`, null)
  }


}
