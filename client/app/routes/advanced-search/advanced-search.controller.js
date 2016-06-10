'use strict';

angular.module('uiGenApp')
  .controller('AdvancedSearchCtrl', function ($scope) {

    // JSON Object  -  {}
    // Array - ["name",5,{}]
    // a = [1]
    // a.push(1) // a = [1,1]  a.length == 1 // a[0]


    vm = this;
    vm.applicants = [{
      "state_name": "Interview Backout",
      "created_on": "2015-12-01T16:11:23Z",
      "name": "Noble",
      "id": 44851,
      "state_id": 11,
      "total_exp": 12.05,
      "edu_degree": "\tB Tech",
      "exp_salary": 12,
      "exp_designation": "\t AsstManager",
      "exp_location": "Adoor",
      "exp_employer": "Hindustan Aeronautics Limited"
    }, {
      "applicant_score": 3,
      "state_name": "CV Reject",
      "created_on": "2015-12-01T16:13:27Z",
      "name": "Jay Test",
      "id": 44852,
      "state_id": 2,
      "total_exp": 5.05,
      "edu_degree": "\t\tB.A",
      "exp_salary": 5,
      "exp_designation": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDeputy Manager",
      "exp_location": "Adoor",
      "exp_employer": "Nokia Solutions And Networks Private Limited"
    }, {
      "applicant_score": 24,
      "state_name": "CV Reject",
      "created_on": "2015-12-02T04:52:03Z",
      "name": "Noble Mavely",
      "id": 44866,
      "state_id": 2,
      "total_exp": 1.01,
      "edu_degree": "\t Diploma in Finance Management",
      "exp_salary": 1,
      "exp_designation": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDeputy Manager",
      "exp_location": "Mumbai",
      "exp_employer": "Chandwani & Chandwani"
    }, {
      "applicant_score": 81,
      "state_name": "CV Reject",
      "created_on": "2015-12-02T04:55:24Z",
      "name": "Noble",
      "id": 44867,
      "state_id": 2,
      "total_exp": 1.01,
      "edu_degree": "\t\tB.A",
      "exp_salary": 1,
      "exp_designation": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDeputy Manager",
      "exp_location": "Mumbai",
      "exp_employer": "Deloitte Haskins & Sells Llp"
    }]
    script(src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js')
    script(src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js')

  });
