import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;

  task : ITask[] =[];
  inprogress : ITask[] =[];
  Done : ITask[] =[];
  updateId !: any;
  isEditEnabled :boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['',Validators.required]
    })
  }
  addTask(){
    this.task.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
 onEdit(item:ITask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
 }

 updateTask(){
   this.task[this.updateId].description = this.todoForm.value.item;
   this.task[this.updateId].done = false;
   this.todoForm.reset();
   this.updateId = undefined;
   this.isEditEnabled = false;
 }
  deleteTask(i: number)
  {
       this.task.splice(i,1)
  }
  deleteInprogressTask(i: number)
  {
       this.inprogress.splice(i,1)
  }
  deleteDoneTask(i: number)
  {
       this.Done.splice(i,1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
