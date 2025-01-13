import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { HighlightedDirective } from './directives/highlighted.directive';
import { interval, Observable } from 'rxjs';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HeaderComponent,
    FormsModule,
    HighlightedDirective,
    FilterPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  todos: NTodo.TodoData[] = [];


  counter = 0;

  counter$: Observable<number>;

  isLoaded = false;

  searchText = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly cd: ChangeDetectorRef

  ) {
    this.counter$ = interval(1000);
  }
  ngDoCheck(): void {
    // if (this.isLoaded) {
    //   console.log('Loaded');
    //   this.cd.markForCheck();
    //   this.isLoaded = false;
    // }
  }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.apiService.get<NTodo.TodosResponse>().subscribe(val => {
      this.todos = val.data;
      this.isLoaded = true;
    });
  }

  deleteTodo(item: NTodo.TodoData) {
    this.apiService.delete<NTodo.TodosResponse>(item.id).subscribe(todos => this.todos = todos.data);
  }

  updateTodo(evt: Event, item : NTodo.TodoData) {
    const val = (evt.target as HTMLTextAreaElement).value;
    // // this.apiService.patch({ description: item.description}, item.id).subscribe(console.log);
  
    const todoCopy = {...this.todos[0], description: 'Nuevo valor'};
    const todos = [... this.todos];
    todos[0] = todoCopy;

    this.todos = [];
    this.todos = todos;

  }

  addTodo() {
    this.apiService.post({
      "title": "Leer documentación técnica",
      "description": "Investigar y leer la documentación de una nueva tecnología o herramienta relevante para el proyecto.",
      "status": "Por hacer",
      "priority": 3,
      "hidden": false,
      "id": 1,
      "deadLine": "2024-04-07T03:25:54.898Z",
      "color": {
        "status": "#ed4040",
        "priority": "#68db68"
      },
      "class": {
        "status": "to-do",
        "priority": "low"
      },
      "progress": 0.2
    }).subscribe(() => this.getTodos());
  }
}
