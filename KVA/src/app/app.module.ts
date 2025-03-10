import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './ui-material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { ItemListComponent } from './shop/item-list/item-list.component';
import { ItemFilterComponent } from './shop/item-filter/item-filter.component';
import { ShopingCartComponent } from './shop/shoping-cart/shoping-cart.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './auth/user.service';
import { ShopService } from './shop/shop.service';
import { RatingModule } from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemCommentsComponent } from './shop/item-comments/item-comments.component';
import { ShopCartService } from './shop/shoping-cart/shopingCart.service';
import { CurrentCartComponent } from './shop/shoping-cart/current-cart/current-cart.component';
import { ShippingCartComponent } from './shop/shoping-cart/shipping-cart/shipping-cart.component';
import { CancelledComponent } from './shop/shoping-cart/cancelled/cancelled.component';
import { ArivedCartComponent } from './shop/shoping-cart/watched-cart/watched-cart.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ShopComponent,
    ItemListComponent,
    ItemFilterComponent,
    ShopingCartComponent,
    ItemCommentsComponent,
    CurrentCartComponent,
    ShippingCartComponent,
    CancelledComponent,
    ArivedCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RatingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    UserService,
    ShopService,
    ItemListComponent,
    ShopCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
