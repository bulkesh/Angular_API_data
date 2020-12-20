import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource ,MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import {MatTableHarness} from '@angular/material/table/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { CocktailComponent } from './cocktail.component';
import { HttpDataServiceService } from '../services/http_data_service.service';
import { Drinks } from '../utils/interface';

describe('CocktailComponent', () => {
  let component: CocktailComponent;
  let fixture: ComponentFixture<CocktailComponent>;
  let loader: HarnessLoader;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatTableModule,
      ],
      declarations: [ CocktailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the table ', async () => {

    const cocktailData: Drinks[] = [{
      "idDrink": "11007",
      "strDrink": "Margarita",
      "strCategory": "Ordinary Drink",
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      "strIngredient1": "Tequila",
      "strIngredient2": "Triple sec",
      "strIngredient3": "Lime juice",
      "strIngredient4": "Salt",
    }];

    component.dataSource = await new MatTableDataSource(cocktailData); 
    fixture.detectChanges();
    
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness.with({selector: '.mat-table'}));
    const rows = await table.getRows();
    
    expect(rows.length).toBe(1);

    const getCellTextByColumn = await table.getCellTextByColumnName();
    const idColumn = getCellTextByColumn['idDrink'];
    const firstColumn = idColumn.headerText[0];

    expect(firstColumn).toBe("Drink Id");

    const firstCOlumnValue = idColumn.text[0];
    const firstRowFirstColumnValue = cocktailData[0]['idDrink'] as string;

    expect(firstCOlumnValue).toBe(firstRowFirstColumnValue);
  });
});
