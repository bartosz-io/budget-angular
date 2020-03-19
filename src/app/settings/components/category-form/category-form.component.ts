import { ExpenseCategory } from '@models/expenseCategory';
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFormComponent implements OnInit {

  @Input() editMode = false;
  @Input() category: ExpenseCategory;
  @Output() categoryAdded: EventEmitter<ExpenseCategory> = new EventEmitter();
  @Output() categoryUpdated: EventEmitter<ExpenseCategory> = new EventEmitter();
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const patternsInitial = this.category.counterpartyPatterns
      .map(pattern => this.createPatternInput(pattern));

    this.categoryForm = this.fb.group({
      id: [this.category.id],
      name: [this.category.name, Validators.required],
      counterpartyPatterns: this.fb.array(patternsInitial)
    });
  }

  isDirty() {
    return this.categoryForm.dirty;
  }

  addPattern() {
    this.patterns.push(this.createPatternInput(''));
  }

  addCategory() {
    this.categoryAdded.emit(this.categoryForm.value);
    this.categoryForm.reset();
  }

  updateCategory() {
    this.categoryUpdated.emit(this.categoryForm.value);
    this.categoryForm.markAsPristine();
  }

  get patterns(): FormArray {
    return this.categoryForm.get('counterpartyPatterns') as FormArray;
  }

  private createPatternInput(value: string) {
    return new FormControl(value, [Validators.required]);
  }
}
