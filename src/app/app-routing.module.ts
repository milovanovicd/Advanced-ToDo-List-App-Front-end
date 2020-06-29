import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';

import { LogoutComponent } from './login/logout/logout.component';
import { AuthGuard } from './login/auth.guard';
import { TodoComponent } from './todo/todo.component';
import { ListTodosComponent } from './todo/list-todos/list-todos.component';
import { ProcessComponent } from './process/process.component';

import { SignupComponent } from './signup/signup.component';
import { ProcessListComponent } from './process/process-list/process-list.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { ProcessesComponent } from './admin-console/processes/processes.component';
import { TodosComponent } from './admin-console/todos/todos.component';
import { UsersComponent } from './admin-console/users/users.component';
import { NewUserComponent } from './admin-console/users/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-user',
    component: NewUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-console',
    children: [
      {
        path: '',
        component: AdminConsoleComponent,
        children: [
          { path: 'processes', component: ProcessesComponent },
          { path: 'todos', component: TodosComponent },
          { path: 'users', component: UsersComponent},
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'processes',
    children: [
      { path: '', component: ProcessListComponent },
      { path: ':processId', component: ProcessComponent },
      { path: ':processId/todos', component: ListTodosComponent },
      { path: ':processId/todos/:id', component: TodoComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**', //bilo koja ruta koja nije već gore definisana
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
