import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserComponent } from './user.component';

const routes: Routes = [{ path: '', component: UserComponent },
{
  path: 'edit/:id',
  component: UserEditorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
