import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
  private subject = new Subject<any>();

  constructor() { }

  sendMessage(message: string) {
    this.subject.next( message );
}

onMessage(): Observable<any> {
  return this.subject.asObservable();
}
}
