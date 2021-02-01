import { Component, OnInit } from '@angular/core';
import { StoreTokenService } from '../store-token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(private tokenStore : StoreTokenService) { }

   loggedIn : boolean = this.tokenStore.isLoggedIn();
  ngOnInit(): void {
  }

}
