import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from '../../models/register-data.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output('onRegister')
  onRegister = new EventEmitter<RegisterData>();

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: this.fb.control('', Validators.email),
      password: this.fb.control('', Validators.minLength(6))
    });
  }

}
