import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    id: any
    first_name: string
    last_name: string
    email: string
    password: string
  constructor(private authService : AuthenticationService
    ,private router : Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      id: this.generateId(),
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      
    };
    // console.log(user);
    this.authService.register(user).subscribe(user=>{
        this.router.navigate(["/"]); 
    },
    err => {
      console.log(err)
    }
    
    )

  }


  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

}
