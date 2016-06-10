'use strict';
var secretEmptyKey = '[$empty$]'
angular.module('uiGenApp')
  .controller('SearchCtrl',function ($timeout, Page, $state, moment,Restangular) {

    var that = this;


    const vm = this;

    vm.myDate ="";

    vm.stateComparator = function (state, viewValue) {
      console.log("stateComparator")
      return viewValue === secretEmptyKey || (''+state).toLowerCase().indexOf((''+viewValue).toLowerCase()) > -1;
    };



    vm.open = function() {
      vm.opened = true;
    }

    vm.close = function() {
      vm.opened = false;
    }

    Page.setTitle('Post New Position');
    vm.data = {
      days_per_week: '5',
      email: '',
      new_job: 1,
      start_work_time: '9:00 AM',
      end_work_time: '5:00 PM',
      job_nature: 1,
      preferred_genders: 'No Preference',
      direct_line_up: '0',
      whitelist: '0',
      func_id: '0',
      Clients:[],
      States:[],
      Regions:[],
      industries:[],
      ClientEMs:[],
      Consultants:[],
      JobSkills: [],
      JobsDegrees: [],
      JobsInstitutes: [],
      JobsIndustries: [],
      JobsEmployers: [],
      ConsultantEMs:[],
      Positions:[],
    };

    vm.ui = {
      days_per_week: [1, 2, 3, 4, 5, 6, 7],
      start_work_time: (function intervalGenerator() {
        const interval = [];
        for (var i = 0; i < 48; i++) {
          interval.push(moment().startOf('day').add(7, 'hour').add(i * 30, 'minute').format('h:mm A'));
        }

        return interval;
      })(),

      end_work_time: (function intervalGenerator() {
        const interval = [];
        for (var i = 0; i < 48; i++) {
          interval.push(moment().startOf('day').add(15, 'hour').add(i * 30, 'minute').format('h:mm A'));
        }

        return interval;
      })(),
    };

    vm.jobmodel = [];
    vm.jobstatus = [ {id: 1, label: "High Priority"}, {id: 2, label: "Open"}, {id: 3, label: "Hold"},{id: 4, label: "Closed"}];
    vm.Clients = {
      select: function ($item) {
        vm.Clients.model= '';
        vm.data.Clients.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
          username: $item.username,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'clients' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.Clients,'id')
            response = _.filter(response,function(client){ return -1 === selectedRegionIds.indexOf(client.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('clients')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.Clients.selectRequired($item);
            }

            return vm.Clients.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.States = {
      select: function ($item) {
        vm.States.model= '';
        vm.data.States.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'states' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.States,'id')
            response = _.filter(response,function(state){ return -1 === selectedRegionIds.indexOf(state.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('states')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.States.selectRequired($item);
            }

            return vm.States.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };
    vm._ = _;

    vm.Regions = {
      select: function ($item) {
        vm.Regions.model= '';
        vm.data.Regions.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'regions' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.Regions,'id')
            response = _.filter(response,function(region){ return -1 === selectedRegionIds.indexOf(region.id)})
            return response.map(function iterate(value) {
              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('regions')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.States.selectRequired($item);
            }

            return vm.States.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.industries = {
      select: function ($item) {
        vm.industries.model= '';
        vm.data.industries.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'industries' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.industries,'id')
            response = _.filter(response,function(industry){ return -1 === selectedRegionIds.indexOf(industry.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('industries')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.industries.selectRequired($item);
            }

            return vm.industries.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.Consultants = {
      select: function ($item) {
        vm.Consultants.model= '';
        vm.data.Consultants.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'consultants' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.Consultants,'id')
            response = _.filter(response,function(consultant){ return -1 === selectedRegionIds.indexOf(consultant.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('regions')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.States.selectRequired($item);
            }

            return vm.States.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.ClientEMs = {
      select: function ($item) {
        vm.ClientEMs.model= '';
        vm.data.ClientEMs.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'client-eng-mgrs' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.ClientEMs,'id')
            response = _.filter(response,function(clientEm){ return -1 === selectedRegionIds.indexOf(clientEm.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('clientEMs')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.ClientEMs.selectRequired($item);
            }

            return vm.ClientEMs.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.ConsultantEMs = {
      select: function ($item) {
        vm.ConsultantEMs.model= '';
        vm.data.ConsultantEMs.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'consultant-eng-mgrs' })
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.ConsultantEMs,'id')
            response = _.filter(response,function(consultantEm){ return -1 === selectedRegionIds.indexOf(consultantEm.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('consultantEMs')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.ConsultantEMs.selectRequired($item);
            }

            return vm.ConsultantEMs.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.onFocus = function (e) {

      $timeout(function () {
        $(e.target).trigger('input');
      });
      //$timeout(function() {
      //  $(e.target).triggerHandler('click');
      //}, 100);
    };

    vm.Employers = {
      select: function selectEmployer($item) {
        if($item.id){ // if item found but item.id not found, then its coming from CREATE options in autocomplete
          vm.data.employer_id = $item.id;
          vm.Employers.model = $item.name;
          vm.Employers.previousValue = $item.name;
        } else {
          vm.Employers.create($item);
        }
      },
      blur: function checkEmployer(){
        setTimeout(function(){
          if(vm.Employers.previousValue != vm.Employers.model){
            var employer = {name:vm.Employers.model};
            vm.Employers.create(employer);
          }
        },1000);

      },
      get: function getEmployer(search) {
        return Restangular
          .all('search')
          .getList({ type:'employers', q: search })
          .then(function gotEmployers(response) {
            vm.Employers.lastSearchResults = response;
            return (_.pluck(response,"name").map(function(i){return i.toLocaleLowerCase();})).indexOf(search.toLowerCase())==-1 ? response.concat([{name:$filter('prefixCreate')(search,1)}]) : response;
          });
      },

      create: function createEmployer(employer, required) {
        if($filter('prefixCreate')(employer.name)) {
          var existInSearch = _.filter(vm.Employers.lastSearchResults,function(item){return item.name.toLowerCase() == employer.name.toLowerCase()})
          if(existInSearch.length){
            vm.Employers.select(existInSearch[0])
          } else {
            return Restangular
              .all('employers')
              .post({name: $filter('prefixCreate')(employer.name)})
              .then(function (employer) {
                return vm.Employers.select(employer);
              }).catch(function (err) {
                if (err.status === 409) {
                  vm.Employers.select(err.data);
                } else {
                  console.log("Error while creating employer")
                }
              })
          }
        }
      },
      noResults: false,
      loadingEmployers: false,
    };



    vm.Positions = {
      focus: function(){

        var clientIDs =  _.pluck(vm.data.Clients,'id')
        return Restangular.all('search')
          .getList({ type: 'jobs' ,ids:clientIDs.join(',')})
          .then(function (response) {
            var selectedRegionIds = _.pluck(vm.data.Positions,'id')
            response = _.filter(response,function(pos){ return -1 === selectedRegionIds.indexOf(pos.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      select: function ($item,$model,$label,$event) {
        vm.Positions.model= '';
        vm.data.Positions.push({
          id: $item.id,
          isRequired: 1,
          name: $item.name,
        });
      },


      get: function (search) {
        var clientIDs =  _.pluck(vm.data.Clients,'id')
        if(clientIDs.length == 0) return []
        if(!search || search ==" "){
          // First time populating dropdown
          return Restangular.all('search')
            .getList({ q: "", type: 'jobs' ,ids:clientIDs.join(',')})
            .then(function (response) {
              response = response.plain()

              var selectedRegionIds = _.pluck(vm.data.Positions,'id')
              response = _.filter(response,function(pos){ return -1 === selectedRegionIds.indexOf(pos.id)})
              return response.map(function iterate(value) {

                return value;
              });
            });
        }
        return Restangular.all('search')
          .getList({ q: search===secretEmptyKey?"":search, type: 'jobs' ,ids:clientIDs.join(',')})
          .then(function (response) {
            response = response.plain()

            var selectedRegionIds = _.pluck(vm.data.Positions,'id')
            response = _.filter(response,function(pos){ return -1 === selectedRegionIds.indexOf(pos.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('Jobroles')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.Jobroles.selectRequired($item);
            }

            return vm.Jobroles.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    //Funcs
    //  .get({ q: '', rows: 20 })
    //  .then(function gotFuncs(response) {
    //    vm.Funcs = response.items;
    //  });

    vm.search = {

      get: function(search) {
        var jobRateFrom;
        var jobRateTo;
        var scoreType = 'consultant';
        if(vm.jobrating=='consultant'){
          jobRateFrom = vm.fromsearch;
          jobRateTo=vm.tosearch;
          scoreType = 'consultant_score'

        }
        if(vm.jobrating=='client'){
          jobRateFrom=vm.fromsearch1;
          jobRateTo=vm.tosearch1;
          scoreType = 'client_score'
        }
        if(vm.jobrating=='Screening'){
          jobRateFrom=vm.fromsearch2;
          jobRateTo=vm.tosearch2;
          scoreType = 'screening_score'
        }
        var jobStatusToSend = (_.pluck(vm.data.States,'name')).join(',');

        var ids = _.map(vm.jobmodel,'id')
        var final = _.filter(vm.jobstatus,function(item){
          return -1!==ids.indexOf(item.id)
        })
        var applicantScore
        if(vm.fromscore && vm.toscore){
          applicantScore = "[" + [vm.fromscore,vm.toscore].join(' TO ') + ']'
        }


        var from = '*', to = '*',
          range = [vm.myDate, vm.myDate];
        if (range[0] instanceof Date) {
          from = range[0].toISOString();

          // check for end time and if it is less than start
          if (!range[1] || (range[0]>range[1])) {
            // Cancel request caused by last change to interview object
            // when it had interview.end not separated
            // then set interview.end to +1 Day
            $timeout.cancel(timeout);
            vm.myDate = new Date(range[0].getTime()+24*3600*1000);
          }
        }

        var to = range[1] instanceof Date ?
          range[1].toISOString(): '*';

        //if (from === '*' && to === '*') {
        //  // to ensure applicants without interview time also include in solr results
        //  vm.interview_time = result;
        //  return;
        //}

        //var result= '['+from+' TO '+to+']'
        //var interview_time='[2016-04-06T00:00:00Z TO 2016-04-06T23:59:59.999Z]';
        if(vm.myDate) {
          var interview_time = '[' + moment(vm.myDate).format('YYYY-MM-DD') + 'T00:00:00Z TO ' + moment(vm.myDate).format('YYYY-MM-DD') + 'T23:59:59.999Z]';
        }
        if(vm.UploadFrom || vm.UploadTo) {
          var UploadDate = '[' + moment(vm.UploadFrom).format('YYYY-MM-DD') + 'T00:00:00Z TO ' + moment(vm.UploadTo).format('YYYY-MM-DD') + 'T23:59:59.999Z]';
        }
        var keywords = {
          state_id: (_.pluck(vm.data.States,'id')).join(','),
          eng_mgr_name_sf: (_.pluck(vm.data.ConsultantEMs,'name')).join(','),
          role: (_.pluck(vm.data.Positions,'name')).join(','),
          client_name_sf:(_.pluck(vm.data.Clients,'name')).join(','),
          consultant_username_sf: (_.pluck(vm.data.Consultants,'name')).join(','),
          exp_location:(_.pluck(vm.data.Regions,'name')).join(','),
          client_name: (_.pluck(vm.data.Clients,'name')).join(','),
          eng_mgr_name: (_.pluck(vm.data.ClientEMs,'name')).join(','),
          job_status:(_.pluck(final,'label')).join(','),
          applicant_score: applicantScore,
          interview_time:interview_time,
          created_on:UploadDate

        }
        //keywords[scoreType] = "dsfsdfsdfsdfsd";
        if(jobRateFrom || jobRateTo) keywords[scoreType]= "[" + [jobRateFrom,jobRateTo].join(' TO ') + ']';
        //if(vm.myDate) keywords[interview_time]= "[" + [vm.myDate,vm.myDate].join(' TO ') + ']';

        console.log(keywords);

        $state.go("search-results",keywords)


      },
    }


  });
