import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormControl,
} from "@angular/forms";

import { ExpenseCategory } from "@models/expenseCategory";

@Component({
  selector: "category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() category: ExpenseCategory;
  @Output() categoryAdded: EventEmitter<ExpenseCategory> = new EventEmitter();
  @Output() categoryUpdated: EventEmitter<ExpenseCategory> = new EventEmitter();
  categoryForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    const patternsInitial = this.category.counterpartyPatterns.map((pattern) =>
      this.createPatternInput(pattern)
    );

    this.categoryForm = this.fb.group({
      id: [this.category.id],
      name: [this.category.name, Validators.required],
      counterpartyPatterns: this.fb.array(patternsInitial),
    });
  }

  isDirty() {
    return this.categoryForm.dirty;
  }

  addPattern() {
    this.patterns.push(this.createPatternInput(""));
  }

  addCategory() {
    this.categoryAdded.emit(this.categoryForm.value);
    this.categoryForm.reset();
  }

  updateCategory() {
    this.categoryUpdated.emit(this.categoryForm.value);
    this.categoryForm.markAsPristine();
  }

  get patterns(): UntypedFormArray {
    return this.categoryForm.get("counterpartyPatterns") as UntypedFormArray;
  }

  private createPatternInput(value: string) {
    return new UntypedFormControl(value, [Validators.required]);
  }
}
