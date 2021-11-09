import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage{

  constructor(private chatServ:ChatServiceService) { 
    
  }

  ngOnInit() {
    
    
  }

}
