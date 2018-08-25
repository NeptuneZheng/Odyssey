import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string[] = [];
  constructor() { }

  add(msg: string){
    this.message.push(msg)
  }

  clear(){
    this.message = []
  }
}
