import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { HttpDataServiceService } from '../services/http_data_service.service';
import { ApiResponseType, Drinks, TableColumnSetup} from '../utils/interface';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  filterParams = new HttpParams();
  cocktailData: Drinks[] = [];
  dataSource = new MatTableDataSource<Drinks>(this.cocktailData);

  readonly columnSetup:TableColumnSetup[] = [
    {
      def:'idDrink',
      title:'Drink Id',
      type: 'text',
    },
    {
      def:'strDrink',
      title:'Name',
      type: 'text',
    },
    {
      def:'strCategory',
      title:'Category',
      type: 'text',
    },
    {
      def:'strAlcoholic',
      title:'Alcoholic',
      type: 'text',
    },
    {
      def:'strIngredient1',
      title:'Ingredient 1',
      type: 'text',
    },
    {
      def:'strIngredient2',
      title:'Ingredient 2',
      type: 'text',
    },
    {
      def:'strIngredient3',
      title:'Ingredient 3',
      type: 'text',
    },
    {
      def:'strIngredient4',
      title:'Ingredient 4',
      type: 'text',
    },
    {
      def:'strDrinkThumb',
      title:'Image',
      type: 'image',
    },
  ];
  displayedColumns = this.columnSetup.map(x => x.def);

  @ViewChild(MatTable) table!: MatTable<Element>;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private readonly httpService: HttpDataServiceService) { }

  ngOnInit(): void {
    this.fetchApiData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Fetch data from API and Fill in to materail table and apply sorting on header click.
   * ON click header name data will be sorted.
   */
  fetchApiData(): void {
    this.httpService.getData(API_URL, this.filterParams)
    .pipe(takeUntil(this.destroyed))
    .subscribe((response: ApiResponseType) =>{
        this.cocktailData = response.drinks;
        this.dataSource = new MatTableDataSource<Drinks>(this.cocktailData);
        this.dataSource.sort = this.sort;
    })
  }

  /** This method apply search filter and
   * display all matching records.
   * Currently FIlter is searching in all the available data in response
   * in every value present in response object.
   * This can be customized according to requirement.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** this method unsubscribe all events on page unload
   * which are subscribed.
   */
  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.complete();
  }

}
