import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ItemcardComponent } from './components/itemcard/itemcard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { BuildComponent } from './components/build/build.component';
import { BuildCardsComponent } from './components/build-cards/build-cards.component';

import { HttpClientModule} from '@angular/common/http'

// import { StlModelViewerModule } from '../angular-stl-model-viewer/src/public-api';

import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { MykartsComponent } from './components/mykarts/mykarts.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BuildsComponent } from './components/builds/builds.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemcardComponent,
    InventoryComponent,
    ItemCardComponent,
    ItemModalComponent,
    BuildComponent,
    BuildCardsComponent,
    SignupComponent,
    LoginComponent,
    ItemComponent,
    MykartsComponent,
    BuildsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StlModelViewerModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}