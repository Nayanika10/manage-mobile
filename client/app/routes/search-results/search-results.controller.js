'use strict';

angular.module('uiGenApp')
  .controller('SearchResultsCtrl', function($location, $scope, $http, $filter, $window, $timeout,$stateParams, $state,User,URLS, moment) {
    $scope.filter = 'exp_location';

    $scope.offset = 0
    if(!localStorage.allFlags){
      localStorage.allFlags = JSON.stringify([{id:'cn',name:'Candidate Name',selected:true},{id:'client',name:'Client',selected:true},{id:'clientusername',name:'Client Username',selected:true},
        {id:'clientem',name:'Client EM',selected:true},{id:'position',name:'Postion',selected:true},{id:'status',name:'JD Status',selected:true},
        {id:'mobile',name:'Mobile Number',selected:true},{id:'consultant',name:'Consultant',selected:true},{id:'consultantusername',name:'Consultant Username',selected:true},
        {id:'consultantem',name:'Consultant EM',selected:true},{id:'interview',name:'Interview Type',selected:true},
        {id:'location',name: 'Location',selected:true},
        {id:'clientscore',name:'Client Score',selected:true},{id:'consultantscore',name:'Consultant Score',selected:true},
        {id:'screeningscore',name:'Screening Score',selected:true},{id:'score',name:'Applicant Score',selected:true},{id:'interviewtime',name:'Interview Time',selected:true},{id:'createdon',name:'Created On',selected:true},{id:'uploadon',name:'Upload On',selected:true}
        ])
      $scope.allFlags = JSON.parse(localStorage.allFlags);
    } else {

      $scope.allFlags = JSON.parse(localStorage.allFlags);
    }


    $scope.$watch('allFlags',function(){

      localStorage.allFlags = JSON.stringify($scope.allFlags)
    },true)


    $scope.states = {}

    $scope.states  = User.states.map(function(item){
      if(item)
        if(item.id && item.name) {
          return $scope.states[item.id.toString()] = item.name
        }
    });

    //console.log( $scope.states)
    var timeout = $timeout(function(){});

    $scope.applicants = [];
    $scope.interview = { };
    $scope.query = {
      eng_mgr_name_sf:{},
      client_name_sf:{},
      state_id:{},
      consultant_username_sf:{},
      exp_location:{},
      interview_time:{},
      updated_on:{},

    };
    $scope.queryJob = {
      type_s: 'job',
      job_status:{},
      eng_mgr_name_sf:{}
    };
    $scope.start = 0;
    $scope.reverse = true;

    $scope.$watch(function() {
      return $window.innerHeight;
    }, function(value) {
      $scope.sidebarStyle = {
        'overflow-y': 'scroll',
        'height': value - 92
      };
    },true);




    function oneWayBindStateParamsToScope(mappings){
      for(var i in mappings){
        var facetedQuery = i;
        var allowed = mappings[i];

        for(var i in $stateParams){
          if(~allowed.indexOf(i)){
            if($stateParams[i]){
              $scope[facetedQuery][i] = {};
              var eng_mgrs = $stateParams[i].split(',')
              eng_mgrs.forEach(function(item){
                $scope[facetedQuery][i][item]=true;
                $scope[facetedQuery][i][item.toLowerCase()]=true;
              })
            }
          }
        }
      }
      return ;
    };


    function syncBack(mappings){

      for(var i in mappings){
        var scopeKey = i;
        mappings[i].forEach(function(queryKey){
          // eng_mgrs = _.filter(eng_mgrs,{*:true})
          if(queryKey == "interview_time" || queryKey == "created_on"){
            var eng_mgrs = [];
            var temp = $scope[scopeKey][queryKey];

          } else {

            var eng_mgrs = [];
            var temp = $scope[scopeKey][queryKey];

            _.each(temp, function(value, key) {
              if (value) eng_mgrs.push(key);
            });

            var facetedQueryToString = eng_mgrs.join(',');
            $stateParams[queryKey] = facetedQueryToString
            //console.log(i, mappings[i],item,eng_mgrs,facetedQueryToString,$stateParams)
          }

        })
      }
    }

    var mappings = {query:['eng_mgr_name_sf','state_name','state_id','consultant_username_sf','exp_location','applicant_score','interview_time','updated_on','created_on'],queryJob:['job_status','client_name','eng_mgr_name','job_status','client_score','screening_score','consultant_score','role']}

    oneWayBindStateParamsToScope(mappings);


    $scope.$watch(function() {return $scope.interview}, function setInterviewRange() {

      // Accepts range array in structure => [offsettime, endtime]
      var from = '*', to = '*',
        range = [$scope.interview.start, $scope.interview.end];
      if (range[0] instanceof Date) {
        from = range[0].toISOString();

        // check for end time and if it is less than start
        if (!range[1] || (range[0]>range[1])) {
          // Cancel request caused by last change to interview object
          // when it had interview.end not separated
          // then set interview.end to +1 Day
          $timeout.cancel(timeout);
          $scope.interview.end = new Date(range[0].getTime()+24*3600*1000);
        }
      }

      var to = range[1] instanceof Date ?
        range[1].toISOString(): '*';
      var result = {};
      if (from === '*' && to === '*') {
        // to ensure applicants without interview time also include in solr results

        $scope.query.interview_time = result;

        return;
      }

      result['['+from+' TO '+to+']'] = true;
      $scope.query.interview_time = result;

    },true);

    $scope.interview.start = $scope.interview_time

    // for saving http request on changing checkbox status
    $scope.$watch(function() {
      return {a: $scope.query, j: $scope.queryJob, i: $scope.interview};
    },function asyncLoadMore() {

      syncBack(mappings)
      //console.log("serializeQ($scope.query)",$scope.query,serializeQ($scope.query))
      $state.transitionTo('search-results', $stateParams, { notify: false });
      $timeout.cancel(timeout); //cancel the last timeout
      // to avoid calling loadMore() on loading of page
      if (!$scope.facet_counts) return;
      timeout = $timeout(function(){
        $scope.loadMore(true);
      }, 800);
    } ,true);




    $scope.reset = function() {
      $scope.query = {};
      $scope.queryJob = {type_s: 'job'};
      $scope.interview = {};
    };

    var serializeQ = function(query) {
      var qArr = [];
      for(var field in query) {
        if (query[field] === '') continue;
        if (typeof query[field] === 'object') {
          var selectedFacet = Object.keys(query[field])
            .filter(function(innerKey) {
              return query[field][innerKey];
            });
          if (selectedFacet.length > 0) {
            // double quotes enable space separated facet query
            ~selectedFacet[0].indexOf(']') ?
              // to check for range facets having query containing square bracket=> []
              qArr.push(field+':'+selectedFacet[0]) :
              qArr.push(field+':'+'("'+selectedFacet.join('" OR "')+'")') ;
          }
          continue;
        };

        qArr.push(
          field+':'+'('+
          query[field].split(' ').map(function(word) {
            if (!isNaN(word)) return word;
            return '*'+word+'*';
          }).join(' AND ')+
          ')'
        );
      }
      return qArr.join(' AND ');
    };

    $scope.orderBy = function(order) {
      // if same column clicked again and again
      // this code create cycle DESC -> ASC -> RESET
      if ($scope.order === order) {
        $scope.reverse ?
          ($scope.reverse = false):
          ($scope.order = '');
      } else {
        // for first time sorting order is DESC
        $scope.reverse = true;
        $scope.order = order;
      }

      $scope.offset = 0;
      $scope.loadMore(true);
    };

    $scope.loadMore = function(refresh) {
      $scope.lazyLoad = false;
      if (refresh) {
        $scope.offset = 0;
        $scope.applicants = [];

        // Move to top if fresh request required
        $window.scrollTo(0,0);
      }

      //console.log("serializeQ($scope.query)",$scope.query,serializeQ($scope.query))
      $scope.moment = moment
      //$scope.query.state_id[5] =true
      $http.post(
        URLS.QUARC_API + "/search?type=applicantStatusSolr",
        {
          q:(function(qJob) {
            return '{!child of="type_s:job"}' + qJob;
          })(serializeQ($scope.queryJob)),
          params: {
            fq: serializeQ($scope.query),
            sort: $scope.order ? $scope.order+' '+($scope.reverse ? 'desc':'asc'): 'score desc'
          },
          offset: $scope.offset,
        }
        )
        .success(function(res) {
          // Handle error for php error
          if (typeof res.response === 'undefined') {
            !refresh ? null : ($scope.applicants = []);
            $scope.lazyLoad = false;
            return;
          }
          $scope.numFound = res.response.numFound;

          // !refresh ? null : ($scope.applicants = []);
          res.response.docs.forEach(function(applicant) {

            $scope.applicants.push(applicant);
            //console.log($scope.applicants);
          });
          console.log($scope.applicants)

          $scope.facet_counts = res.facet_counts;
          $scope.job_facet_counts = res.job_facet_counts;
          $scope.offset += 40;
          //console.log(res.response.docs.length);
          $scope.lazyLoad = (res.response.docs.length < 40)? false : true;
        })
        .error(function() {
          console.log('There was problem loading data. Please contact QuezX team');
          !refresh ? null : ($scope.applicants = []);
          $scope.lazyLoad = false;
          return;
        });
    };

    // Loadmore called after stateparams synced with scope and watchers enabled to scope
    $scope.loadMore();
    angular.element($window).bind("scroll", function() {
      // is lazy loading enable
      if (!$scope.lazyLoad) return;
      var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      var body = document.body, html = document.documentElement;
      var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      var windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        $scope.loadMore();
      }
    });
    //.setCarouselHeight('#carousel-example');
    //
    //function setCarouselHeight(id)
    //{
    //  var slideHeight = [];
    //  $(id+' .item').each(function()
    //  {
    //    // add all slide heights to an array
    //    slideHeight.push($(this).height());
    //  });
    //
    //  // find the tallest item
    //  max = Math.max.apply(null, slideHeight);
    //
    //  // set the slide's height
    //  $(id+' .carousel-content').each(function()
    //  {
    //    $(this).css('height',max+'px');
    //  });
    //}


    function setCarouselHeight(id)
    {
      var slideHeight = [];
      $(id+' .item').each(function()
      {
        // add all slide heights to an array
        slideHeight.push($(this).height());
      });

      // find the tallest item
      max = Math.max.apply(null, slideHeight);

      // set the slide's height
      $(id+' .carousel-content').each(function()
      {
        $(this).css('height',max+'px');
      });
    }
  });
+function ($) {
  'use strict';

  // SIDEBAR PUBLIC CLASS DEFINITION
  // ================================

  var Sidebar = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Sidebar.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Sidebar.DEFAULTS = {
    toggle: true
  }

  Sidebar.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('sidebar-open')) return


    var startEvent = $.Event('show.bs.sidebar')
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return

    this.$element
      .addClass('sidebar-open')

    this.transitioning = 1

    var complete = function () {
      this.$element
      this.transitioning = 0
      this.$element.trigger('shown.bs.sidebar')
    }

    if(!$.support.transition) return complete.call(this)

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(400)
  }

  Sidebar.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('sidebar-open')) return

    var startEvent = $.Event('hide.bs.sidebar')
    this.$element.trigger(startEvent)
    if(startEvent.isDefaultPrevented()) return

    this.$element
      .removeClass('sidebar-open')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.sidebar')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(400)
  }

  Sidebar.prototype.toggle = function () {
    this[this.$element.hasClass('sidebar-open') ? 'hide' : 'show']()
  }

  var old = $.fn.sidebar

  $.fn.sidebar = function (option) {
    return this.each(function (){
      var $this = $(this)
      var data = $this.data('bs.sidebar')
      var options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof options == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.sidebar', (data = new Sidebar(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.sidebar.Constructor = Sidebar

  $.fn.sidebar.noConflict = function () {
    $.fn.sidebar = old
    return this
  }

  $(document).on('click.bs.sidebar.data-api', '[data-toggle="sidebar"]', function (e) {
    var $this = $(this), href
    var target = $this.attr('data-target')
      || e.preventDefault()
      || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')
    var $target = $(target)
    var data = $target.data('bs.sidebar')
    var option = data ? 'toggle' : $this.data()

    $target.sidebar(option)
  })


  $('html').on('click.bs.sidebar.autohide', function(event){
    var $this = $(event.target);
    var isButtonOrSidebar = $this.is('.sidebar, [data-toggle="sidebar"]') || $this.parents('.sidebar, [data-toggle="sidebar"]').length;
    if (isButtonOrSidebar) {
      return;
    } else {
      var $target = $('.sidebar');
      $target.each(function(i, trgt) {
        var $trgt = $(trgt);
        if($trgt.data('bs.sidebar') && $trgt.hasClass('sidebar-open')) {
          $trgt.sidebar('hide');
        }
      })
    }
  });
}(jQuery);
angular.module('radioExample', [])
  .controller('ExampleController', ['$scope', function($scope) {


    // $scope.specialValue = {
    //   "id": "12345",
    //   "value": "green"
    // };
  }]);
