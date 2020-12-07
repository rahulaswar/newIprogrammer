import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMessageService } from '../services/send-message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
 public  SendCount = 0;
 public  helloText = '';
 public myForm: FormGroup;
  constructor(private storageService: StorageService, private messageService: SendMessageService,public fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      message: [null, Validators.compose([Validators.required, Validators.pattern('^[#.0-9a-zA-Z\s,-_`~!%^&*()_+-=?<>${}[]|\/]+$')])],
    });
    // set local storage hard coded value
    this.setLocalStorageValue('name', 'Rahul');

    // get local storage value
    console.log(this.getLocalStorageValue('name'));

    // removes the entry 'name'
    // this.storageService.secureStorage.removeItem('name');

  }
  public sendToChild() {
    this.SendCount++;
  }

  public sayHello(event) {
    this.helloText = event;
  }

  public setLocalStorageValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
}
public getLocalStorageValue(key: string) {
  return this.storageService.secureStorage.getItem(key);
}

sendMessage(): void {
  if (this.myForm.invalid) {
    return;
  }
  // send message to subscribers via observable subject
  this.messageService.sendMessage(this.myForm.controls.message.value);
}
}
