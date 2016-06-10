'use strict';

angular.module('uiGenApp')
  .service('QuarcService', function (URLS, Page, Session, User) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      Page: Page,
      Session: Session,
      User: User,
      URLS: URLS
    };
  });
