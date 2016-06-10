angular.module('uiGenApp')
  .controller('ApplicantNewController', function NewJobCtrl(QuarcService, Restangular, $state, moment,Upload, URLS,$stateParams,currentJob,$filter,QCONFIG) {

    const Page = QuarcService.Page;

    Page.setTitle('Upload CV');
    const vm = this;
    vm.buckets = QCONFIG.APPLICANT_STATES;
    vm.job = currentJob;
    vm.data = {};

    vm.Regions = {
      select: function selectRegion($item) {
        vm.data.region_id = $item.id;
      },

      get: function getRegions(search) {
        return Restangular
          .all('search')
          .getList({
            type: 'regions',
            q: search
          })
          .then(function gotRegions(response) {
            return response;
          });
      },

      noResults: false,
      loadingRegions: false,
    };

    vm.Degrees = {
      select: function selectDegree($item) {
        if($item.id){
          vm.data.degree_id = $item.id;
          vm.Degrees.model = $item.name;
          vm.Degrees.previousValue = $item.name;
        } else {
          vm.Degrees.create($item);
        }
      },
      blur: function checkDegree(){
        setTimeout(function() {
          if(vm.Degrees.previousValue != vm.Degrees.model){
            var degree = {name:vm.Degrees.model};
            vm.Degrees.create(degree);
          }
        },1000);
      },
      get: function getDegree(search) {
        return Restangular
          .all('search')
          .getList({ type:'degrees', q: search })
          .then(function gotDegrees(response) {
            return (_.pluck(response,"name")).indexOf(search)==-1 ? response.concat([{name:$filter('prefixCreate')(search,1)}]) : response;
          });
      },

      create: function createDegree(degree, required) {
        return Restangular
          .all('degrees')
          .post({name:$filter('prefixCreate')(degree.name)})
          .then(function(degree){
            return vm.Degrees.select(degree);
          }).catch(function(err){
            if(err.status === 409){
              vm.Degrees.select(err.data);
            } else {
              console.log("Error while creating degree")
            }
          })
      },
      noResults: false,
      loadingDegrees: false,
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
            return (_.pluck(response,"name")).indexOf(search)==-1 ? response.concat([{name:$filter('prefixCreate')(search,1)}]) : response;
          });
      },

      create: function createEmployer(employer, required) {
        return Restangular
          .all('employers')
          .post({name:$filter('prefixCreate')(employer.name)})
          .then(function(employer){
            return vm.Employers.select(employer);
          }).catch(function(err){
            if(err.status === 409){
              vm.Employers.select(err.data);
            } else {
              console.log("Error while creating employer")
            }
          })
      },
      noResults: false,
      loadingEmployers: false,
    };

    vm.Designations = {
      select: function selectDesignation($item) {
        if($item.id){
          vm.data.designation_id = $item.id;
          vm.Designations.model = $item.name;
          vm.Designations.previousValue = $item.name;
        } else {
          vm.Designations.create($item);
        }
      },
      blur: function checkDesignation(){
        setTimeout(function() {
          if (vm.Designations.previousValue != vm.Designations.model) {
            var designation = {name: vm.Designations.model};
            vm.Designations.create(designation);
          }
        },1000);
      },
      get: function getDesignation(search) {
        return Restangular
          .all('search')
          .getList({ type:'designations', q: search })
          .then(function gotDesignations(response) {
            return (_.pluck(response,"name")).indexOf(search)==-1 ? response.concat([{name:$filter('prefixCreate')(search,1)}]) : response;
          });
      },

      create: function createDesignation(designation, required) {
        return Restangular
          .all('designations')
          .post({name:$filter('prefixCreate')(designation.name)})
          .then(function(designation){
            return vm.Designations.select(designation);
          }).catch(function(err){
            if(err.status === 409){
              vm.Designations.select(err.data);
            } else {
              console.log("Error while creating designation")
            }
        })
      },
      noResults: false,
      loadingDesignations: false,
    };

    vm.uploadFile = function (jobId, cvfile,payload,successCB,errorCB) {
      return vm.file = cvfile, cvfile ? ( Upload.upload({
        url: URLS.QUARC_API + "/jobs/"+jobId+"/applicants",
        data: {
          fileUpload: cvfile,
          payload:JSON.stringify(payload)
        }
      }).then(function (response) {
        return successCB(response)
      }, function (err) {
        return errorCB(err);
        //return b.status > 0 ? vm.errorMsg = b.status + ": " + b.data : void 0
      }, function (progress) {
        // used for progressbar
        return vm.progress = Math.min(100, parseInt(100 * progress.loaded / progress.total))
      })) : void 0
    }

    vm.create = function createJob() {
      vm.uploadFile($stateParams.jobId, vm.data.file, vm.data,function jobCreated(response) {
        return setTimeout(function(){
          $state.go('applicant.view', { applicantId: response.data.id })
        },1000);
      },
      function errorCB(err){
        return console.log("Error while uploading...")
      })
    };

  });
