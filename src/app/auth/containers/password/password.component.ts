import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../../services/password.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public isFinished: boolean;
  public email: string;
  public passwordForm: FormGroup;
  public recovery: boolean;
  public task: string;
  private code: string;

  constructor(
    private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.isFinished = false;
    this.email = this.activeRoute.snapshot.queryParams.email;
    this.code = this.activeRoute.snapshot.queryParams.code;
    this.recovery = this.activeRoute.snapshot.queryParams.recovery;
    this.task = this.recovery ? 'Recover' : 'Set';

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  get f() { return this.passwordForm.controls; }

  setPassword() {
    let task: Observable<void>;
    if (this.recovery) {
      task = this.passwordService.recover(this.email, this.code, this.f.password.value);
    } else {
      task = this.passwordService.setup(this.email, this.code, this.f.password.value);
    }
    task.subscribe(() => this.isFinished = true);
  }

}
