import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './todo/list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './login/logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { HttpIntercepterBasicAuthService } from './service/htpp/http-intercepter-basic-auth.service';
import { ProcessComponent } from './process/process.component';
import { ProcessListComponent } from './process/process-list/process-list.component';
import { SignupComponent } from './signup/signup.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { ProcessesComponent } from './admin-console/processes/processes.component';
import { TodosComponent } from './admin-console/todos/todos.component';
import { UsersComponent } from './admin-console/users/users.component';
import { NewUserComponent } from './admin-console/users/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    ProcessComponent,
    ProcessListComponent,
    SignupComponent,
    AdminConsoleComponent,
    ProcessesComponent,
    TodosComponent,
    UsersComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
