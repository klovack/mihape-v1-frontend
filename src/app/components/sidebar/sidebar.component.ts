import { Component, AfterContentInit, DoCheck } from '@angular/core';
import {
  faSearch,
  faPlusSquare,
  faUserCircle,
  faUsers,
  faGlobeAsia,
  faDesktop,
  faInfoCircle,
  faPhone,
  faBriefcase,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements DoCheck {

  faSearch = faSearch;
  faPlusSquare = faPlusSquare;
  faUserCircle = faUserCircle;
  faUsers = faUsers;
  faGlobeAsia = faGlobeAsia;
  faDesktop = faDesktop;
  faInfoCircle = faInfoCircle;
  faPhone = faPhone;
  faBriefcase = faBriefcase;
  faAngleDoubleRight = faAngleDoubleRight;
  faFacebook = faFacebookSquare;
  faInstagram = faInstagram;
  faYoutube = faYoutubeSquare;

  isExpanded = false;
  isUserLoggedIn = false;

  constructor(private dialogService: DialogService, private authService: AuthService) { }

  ngDoCheck() {
    this.checkForUserLoggedIn();
  }

  checkForUserLoggedIn() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn;
  }

  onExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onSearch(searchInput?: HTMLInputElement, searchLink?: HTMLAnchorElement) {
    if (this.isExpanded) {
      if (searchLink) {
        searchLink.href = `https://blog.mihape.com/?s=${searchInput.value}`;
        searchLink.click();
      } else {
        document.location.href =  `https://blog.mihape.com/?s=${searchInput.value}`;
      }
    } else {
      this.isExpanded = true;
    }
  }

  onSignin() {
    this.dialogService.viewSignin();
  }

  onSignup() {
    this.dialogService.viewSignup();
  }

}
