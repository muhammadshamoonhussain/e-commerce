import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
// import Swal from "sweetalert2";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  myContact!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService,private http:HttpClient) {
    this.myContact = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(data:any) {
    this.http.post('http://localhost:3000/contact', data)
    .subscribe((response: any) => {
      console.log('Contact saved', response);

        // Swal.fire({
        //   title: "Your Form Is Submitted!",
        //   icon: "success"
        // });
        this.myContact.reset();
      });
    }
  }

