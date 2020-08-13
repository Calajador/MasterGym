import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
  }

}
