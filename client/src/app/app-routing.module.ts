import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './components/build/build.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { MykartsComponent } from './components/mykarts/mykarts.component';
import { SignupComponent } from './components/signup/signup.component';
import { BuildsComponent } from './components/builds/builds.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'inventory', component: InventoryComponent
  },
  {
    path: 'build', component: BuildComponent
  },
  {
    path: 'builds', component: BuildsComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  
  {
    path: 'item', component: ItemComponent
  },
  {
    path: 'karts', component: MykartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
