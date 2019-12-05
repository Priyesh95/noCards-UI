import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id: any = ''
  first_name: string = '';
  last_name: string = '';
  email: string
  password: string;
  showMessage = false
  constructor(private authService : AuthenticationService
    ,private router : Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      
    };
    // console.log(user);
    this.authService.login(user).subscribe((data)=>{
      if(data.token){
        this.router.navigate(["/"]); 
      }
      else{
        this.showMessage = true
      }
    },
    err => {
      console.log(err)
    }
    
    )

}
}
