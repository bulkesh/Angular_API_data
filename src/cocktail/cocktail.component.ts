import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { HttpDataServiceService } from '../services/http_data_service.service';
import { ApiResponseType, Drinks} from '../utils/interface';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit, AfterViewInit {
  private readonly destroyed = new ReplaySubject<void>(1);
  filterParams = new HttpParams();
  cocktailData: Drinks[] = [];
  displayedColumns: string[] = ['idDrink', 'strDrink', 'strCategory', 'strAlcoholic', 'strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4', 'strDrinkThumb'];
  dataSource = new MatTableDataSource<object>(this.cocktailData);

  @ViewChild(MatTable) table!: MatTable<Element>;
  @ViewChild(MatSort) sort!: MatSort;
  
  

  constructor(private readonly httpService: HttpDataServiceService) { }

  ngOnInit(): void {
    this.fetchApiData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  fetchApiData(): void {
    this.httpService.getData(API_URL, this.filterParams)
    .pipe(takeUntil(this.destroyed))
    .subscribe((response: ApiResponseType) =>{
        this.cocktailData = response.drinks;
        this.dataSource = new MatTableDataSource<object>(this.cocktailData);
        this.dataSource.sort = this.sort;
        this.overriderFilter();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("this.dataSource : ",this.dataSource);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  overriderFilter(){
    this.dataSource.filterPredicate = function(data:any, filter: string): boolean {
      console.log("data : ",data);
      console.log("filter : ",filter);
      console.log("data.idDrink.toLowerCase() : ",data.idDrink.toLowerCase());
      return data.idDrink.toLowerCase().includes(filter) === filter;
    };
  }

}
