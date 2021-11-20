import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../../../../shared/shared.module";
import { ExpensesTableComponent } from "../../../components/expenses-table/expenses-table.component";
import { ExpensesComponent } from "../expenses.component";
import { JwtAuthStrategy } from "../../../../auth/services/jwt-auth.strategy";
import { AUTH_STRATEGY } from "../../../../auth/services/auth.strategy";
import { ExpensesService } from "../../../services/expenses.service";
import { CacheService } from "../../../../core/cache.service";
import { ExpenseCategoryApi } from "../../../../shared/api/expenseCategory.api";
import { ExpenseApi } from "../../../api/expense.api";

describe("Deep test: ExpensesComponent", () => {
  let fixture: ComponentFixture<ExpensesComponent>;
  let component: ExpensesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesComponent, ExpensesTableComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
      ],
      providers: [
        CacheService,
        ExpensesService,
        ExpenseApi,
        ExpenseCategoryApi,
        {
          provide: AUTH_STRATEGY,
          useClass: JwtAuthStrategy,
        },
      ],
    });
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
  });

  it("creates the component", () => {
    expect(component).toBeTruthy();
  });
});
