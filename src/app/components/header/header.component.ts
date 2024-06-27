import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopover = false;
  activeNavItem:number = 0;
  constructor(
    private userService: UserService,
    private popoverConfig:NgbPopoverConfig,
    private tokenService:TokenService
  ) { }

  togglePopover(event:Event):void{
    event.preventDefault();
    this.isPopover = !this.isPopover;
  }

  handelItemClick(index: number){
    if(index===2){
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopover = false
  }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  setActiveNavItem(index:number){
    this.activeNavItem = index;
  }
}
