'use strict';

angular.module('uiGenApp')
  /***
   * Sentence Case
   * <input type=text ucf-sentence>
   *   hello world -> Hello World
   *   HELLO WORLD -> HELLO WORLD
   ***/
  // Todo: directives require ngModel rebinding model -> Impacting Multiple refresh
  // Review: Currently fixed using typeahead-wait-ms="10"  in input typehead
  .directive('ucfSentence', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined) {
            inputValue = '';
          }
          var capitalized = $filter('ucf_sentence')(inputValue);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  /***
   * Sentence Case with First Character of word Cap and remaining lowercase
   * <input type=text ucf-sentence-case>
   *   hello world -> Hello World
   *   HELLO WORLD -> Hello World
   ***/
  .directive('ucfSentenceCase', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined) {
            inputValue = '';
          }
          var capitalized = $filter('ucf_sentence_case')(inputValue);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  /***
   * Lower Case
   * <input type=text ucf-lowercase>
   *   manjesh@quetzal.in -> manjesh@quetzal.in
   *   MANJESH@QueTzal.In -> manjesh@quetzal.in
   ***/

  .directive('ucfLowercase', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined) {
            inputValue = '';
          }
          var capitalized = $filter('ucf_lowercase')(inputValue);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  /***
   * ng-bind for input / Used to derived variable in view
   * <input type=hidden|any bound-model="$scope.var1 + $scope.var2">
   *   Ex:
   *  <input type="hidden" ng-model="total_exp" bound-model="total_exp_y + total_exp_m"
   *  <input type="number" ng-model="total_exp_y"
   *  <input type="number" ng-model="total_exp_m"
   ***/
  .directive('boundModel', function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.boundModel, function (newValue, oldValue) {
          if (newValue != oldValue) {
            ngModel.$setViewValue(newValue);
            ngModel.$render();
          }
        });
      }
    };
  })
  /***
   * Toggle class when file dropstart & dropend
   * <input|div|any drag-drop-toggle>
   *   Helps to write CSS
   ***/
  .directive('dragDropToggle', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, el, attrs, controller) {
        el.bind("dragover dragenter", function (e) {
          el.addClass('is-dragover');
        });
        el.bind("dragleave dragend drop", function (e) {
          el.removeClass('is-dragover');
        });
      }
    }
  })


  /***
   *  Check same applicant uploading to current job again using email or phone number
   *
   *  <input type="email"   q-applicant-job-unique='email~{{$scope.variable}}'>
   *  Ex: <input type="email"   q-applicant-job-unique='email~manjesh@quetzal.in'>
   *  <input type="number"   q-applicant-job-unique='number~{{$scope.variable}}'>
   *  Ex: <input type="number"   q-applicant-job-unique='number~9844717202'>
   *
   *  Impact:
   *  form.filed.$error.unique
   * */


  .directive('qApplicantJobUnique', function (Restangular) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var typeAndJobId = attrs.qApplicantJobUnique.split('~')
        var type = typeAndJobId[0];
        var jobId = typeAndJobId[1];
        elem.on('blur', function (evt) {
          scope.$apply(function () {
            var term = elem.val()
            if (term && attrs.ngPattern.test(term)) { // If blank no request
              Restangular
                .one('jobs', jobId)
                .one('applicants', 'checkAlreadyApplied')
                .get({[type]: term})
                .then(function (status) {
                  if (status[type])
                    ctrl.$setValidity('unique', false);
                  else
                    ctrl.$setValidity('unique', true);
                })
                .catch(function (err) {
                  console.log("Error while checking email & phone")
                })
            }

          });
        })
      }
    }
  })

  /***
   *  Strips characters not mactching ng-pattern while typing
   *
   *  Ex: <input type="number"   q-pattern='number~9844717202'>
   *
   *  Impact:
   *  form.filed.$error.unique
   * */

  .directive('qPattern', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined || inputValue === null) {
            inputValue = '';
          }
          if (typeof inputValue === "number") {
            inputValue = inputValue.toString();
          }
          var capitalized = inputValue.replace(new RegExp(attrs.qPattern, 'g'), "");
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  /***
   *  Check Max Length
   *
   *  Ex: <input type="number"   name="mobile" q-max-length='10'>
   *
   * */
  .directive('qMaxlength', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined || inputValue === null) {
            inputValue = '';
          }
          if (typeof inputValue === "number") {
            inputValue = inputValue.toString();
          }
          var numbers = inputValue.replace(/[^0-9 ]*/g, "");
          var capitalized = numbers.substr(0, numbers.length > attrs.qMaxlength ? attrs.qMaxlength : numbers.length);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  .directive('qTextMaxlength', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined || inputValue === null) {
            inputValue = '';
          }
          if (typeof inputValue === "number") {
            inputValue = inputValue.toString();
          }

          var capitalized = inputValue.substr(0, inputValue.length > attrs.qTextMaxlength ? attrs.qTextMaxlength : inputValue.length);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  .directive('qFloatMaxlength', function ($parse, $filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function (inputValue) {
          if (inputValue === undefined || inputValue === null) {
            inputValue = '';
          }
          if (typeof inputValue === "number") {
            inputValue = inputValue.toString();
          }
          var numbers = inputValue.replace(/[^0-9.]*/g, "");
          var capitalized = numbers.substr(0, numbers.length > attrs.qFloatMaxlength ? attrs.qFloatMaxlength : numbers.length);
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
      }
    };
  })

  // Todo: v1 Refactor : take reading from element
  .directive('tableOffset', function ($parse, $filter) {
    return {
      link: function (scope, element, attrs, modelCtrl) {
        $('.scrollableContainer').height($(window).height() - ($('.scrollableContainer').position().top+85))

      }
    };
  })
  .directive('typeaheadFocus', function ($parse,$filter) {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ctrl) {
      element.bind('click', function () {
        console.log("onclick")
        ctrl.$setViewValue(' ');
      });
    }
  };
});


;
