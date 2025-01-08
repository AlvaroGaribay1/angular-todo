import { Component, ElementRef, QueryList, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { TODO_DATA } from '../assets/todo';
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { InputComponent } from "./components/input/input.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    TodoComponent,
    CommonModule,
    InputComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  todoData = TODO_DATA.filter(item => item.id < 2);

  @ViewChildren(TodoComponent, {read: ElementRef}) todo?: QueryList<ElementRef>;



  constructor(public router: Router) {
    
  }
  
  getTodoInfo(val: NTodo.TodoData) {
    console.log(val);
  }

  trackByFunction(index: number, item: NTodo.TodoData) {
    return index;
  }

  orderData() {
    //Ordena por prioridad
    this.todoData.sort((a, b) => a.priority - b.priority);
  }

  selectTodo() {
    console.log(this.todo);
  }

  addTodo() {
    this.todoData = TODO_DATA.filter(item => item.id < 5)
  }
}
