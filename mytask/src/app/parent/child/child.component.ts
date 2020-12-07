import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendMessageService } from 'src/app/services/send-message.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit,OnDestroy {
  @Input() Count;
  @Output() hello: EventEmitter<string> = new EventEmitter<string>();
  public messages: any[] = [];
  public subscription: Subscription;
  constructor(private messageService: SendMessageService) {
    this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      }
    });

   }

  ngOnInit(): void {
  }
  sayHello($event) {
    this.hello.emit('Hello');
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}

