import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }


  public login(username, password) {
    this.apiService.login({
      email: username,
      password: password
    })
      .toPromise()
      .then(x => console.log(x))
      .catch(x => console.log(x))

  }


}
