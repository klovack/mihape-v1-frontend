import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  onExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onSearch(searchInput: HTMLInputElement) {
    if (this.isExpanded) {
      console.log('GO SEARCH');
    } else {
      this.isExpanded = true;
      setTimeout(() => {
        searchInput.focus();
      }, 10);
    }
  }

}
