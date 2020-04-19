import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public isSetupFinished: boolean;
  public email: string;
  public passwordForm: FormGroup;
  private code: string;

  constructor(
    private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.isSetupFinished = false;
    this.email = this.activeRoute.snapshot.queryParams.email;
    this.code = this.activeRoute.snapshot.queryParams.code;

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  get f() { return this.passwordForm.controls; }

  setup() {
    this.passwordService.setup(this.email, this.code, this.f.password.value)
      .subscribe(() => this.isSetupFinished = true);
  }

}
