angular.module('dependencyQuiz').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('404.html',
    "<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>Page Not Found :(</title><style>::-moz-selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      ::selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      html {\n" +
    "        padding: 30px 10px;\n" +
    "        font-size: 20px;\n" +
    "        line-height: 1.4;\n" +
    "        color: #737373;\n" +
    "        background: #f0f0f0;\n" +
    "        -webkit-text-size-adjust: 100%;\n" +
    "        -ms-text-size-adjust: 100%;\n" +
    "      }\n" +
    "\n" +
    "      html,\n" +
    "      input {\n" +
    "        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n" +
    "      }\n" +
    "\n" +
    "      body {\n" +
    "        max-width: 500px;\n" +
    "        _width: 500px;\n" +
    "        padding: 30px 20px 50px;\n" +
    "        border: 1px solid #b3b3b3;\n" +
    "        border-radius: 4px;\n" +
    "        margin: 0 auto;\n" +
    "        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n" +
    "        background: #fcfcfc;\n" +
    "      }\n" +
    "\n" +
    "      h1 {\n" +
    "        margin: 0 10px;\n" +
    "        font-size: 50px;\n" +
    "        text-align: center;\n" +
    "      }\n" +
    "\n" +
    "      h1 span {\n" +
    "        color: #bbb;\n" +
    "      }\n" +
    "\n" +
    "      h3 {\n" +
    "        margin: 1.5em 0 0.5em;\n" +
    "      }\n" +
    "\n" +
    "      p {\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      ul {\n" +
    "        padding: 0 0 0 40px;\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      .container {\n" +
    "        max-width: 380px;\n" +
    "        _width: 380px;\n" +
    "        margin: 0 auto;\n" +
    "      }\n" +
    "\n" +
    "      /* google search */\n" +
    "\n" +
    "      #goog-fixurl ul {\n" +
    "        list-style: none;\n" +
    "        padding: 0;\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-fixurl form {\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt,\n" +
    "      #goog-wm-sb {\n" +
    "        border: 1px solid #bbb;\n" +
    "        font-size: 16px;\n" +
    "        line-height: normal;\n" +
    "        vertical-align: top;\n" +
    "        color: #444;\n" +
    "        border-radius: 2px;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt {\n" +
    "        width: 220px;\n" +
    "        height: 20px;\n" +
    "        padding: 5px;\n" +
    "        margin: 5px 10px 0 0;\n" +
    "        box-shadow: inset 0 1px 1px #ccc;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb {\n" +
    "        display: inline-block;\n" +
    "        height: 32px;\n" +
    "        padding: 0 10px;\n" +
    "        margin: 5px 0 0;\n" +
    "        white-space: nowrap;\n" +
    "        cursor: pointer;\n" +
    "        background-color: #f5f5f5;\n" +
    "        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        -webkit-appearance: none;\n" +
    "        -moz-appearance: none;\n" +
    "        appearance: none;\n" +
    "        *overflow: visible;\n" +
    "        *display: inline;\n" +
    "        *zoom: 1;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb:hover,\n" +
    "      #goog-wm-sb:focus {\n" +
    "        border-color: #aaa;\n" +
    "        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n" +
    "        background-color: #f8f8f8;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt:hover,\n" +
    "      #goog-wm-qt:focus {\n" +
    "        border-color: #105cb6;\n" +
    "        outline: 0;\n" +
    "        color: #222;\n" +
    "      }\n" +
    "\n" +
    "      input::-moz-focus-inner {\n" +
    "        padding: 0;\n" +
    "        border: 0;\n" +
    "      }</style></head><body><div class=container><h1>Not found <span>:(</span></h1><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><script>var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;</script><script src=//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js></script></div></body></html>"
  );


  $templateCache.put('index.html',
    "<!doctype html><html class=no-js><head><meta charset=utf-8><title></title><meta name=description content=\"\"><meta name=viewport content=\"width=device-width\"><!-- Place favicon.ico and apple-touch-icon.png in the root directory --><!-- build:css(.) styles/vendor.css --><!-- bower:css --><!-- endbower --><!-- endbuild --><!-- build:css(.tmp) styles/main.css --><link rel=stylesheet href=styles/main.css><!-- endbuild --></head><body ng-app=dependencyQuizApp><!--[if lt IE 7]>\n" +
    "      <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>\n" +
    "    <![endif]--><div ng-view=\"\"></div><!-- build:js(.) scripts/oldieshim.js --><!--[if lt IE 9]>\n" +
    "    <script src=\"bower_components/es5-shim/es5-shim.js\"></script>\n" +
    "    <script src=\"bower_components/json3/lib/json3.js\"></script>\n" +
    "    <![endif]--><!-- endbuild --><!-- build:js(.) scripts/vendor.js --><!-- bower:js --><script src=bower_components/angular/angular.js></script><script src=bower_components/angular-resource/angular-resource.js></script><script src=bower_components/angular-cookies/angular-cookies.js></script><script src=bower_components/angular-sanitize/angular-sanitize.js></script><script src=bower_components/angular-route/angular-route.js></script><script src=bower_components/lodash/dist/lodash.compat.js></script><script src=bower_components/ngstorage/ngStorage.js></script><!-- endbower --><!-- endbuild --><!-- build:js({.tmp,app}) scripts/scripts.js --><script src=scripts/app.js></script><script src=scripts/controllers/teacher.js></script><script src=scripts/controllers/student.js></script><script src=scripts/controllers/about.js></script><script src=scripts/services/db.js></script><script src=scripts/directives/linksnav.js></script><script src=scripts/directives/dqnewquestion.js></script><script src=scripts/directives/test.js></script><script src=scripts/directives/studentquestion.js></script><script src=scripts/services/studenthelpers.js></script><!-- endbuild --></body></html>"
  );


  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/linksNav.html',
    "<ul ng-show=\"arr.length > 0\"><li ng-repeat=\"question in arr\" ng-click=linksNav.show(question)>{{ question.question }}</li></ul>"
  );


  $templateCache.put('views/main.html',
    "<div class=previous ng-if=\"previousQuestions.length > 0\"><p class=previous ng-repeat=\"previous in previousQuestions\" ng-click=show(previous)>{{ previous.Q.question }}</p></div><div class=parent ng-if=\"parentQuestions.length > 0\"><p ng-repeat=\"parent in parentQuestions\" class=parent ng-click=show(parent)>{{ parent.Q.question }}</p></div><div class=fresh ng-if=\"!currentTestQ || !currentTestQ.Q\"><button class=new ng-click=newQuestionBtn()>New Question</button> <button class=existing ng-click=oldQuestionBtn()>Existing Question</button></div><div class=question ng-if=\"currentTestQ && currentTestQ.Q\"><form onsubmit=\"return false\" role=form><div class=questionText><p>Question:</p><input ng-model=currentTestQ.Q.question class=form-control placeholder=\"Enter a question\"></div><div id=choices><p>Answer choices:</p><div class=choice ng-repeat=\"choice in currentTestQ.Q.choices\"><input ng-model=choice.value> <input ng-model=choice.correct type=checkbox></div><button ng-click=addChoice()>add another choice</button></div><div class=dependencies><ul><li class=dependency ng-click=show(dependency) ng-repeat=\"dependency in currentTestQ.dependencies\">{{dependency.Q.question}}</li></ul><button ng-click=newDependency() class=newDependency>Add <span ng-if=\"currentTestQ.dependencies.length > 0\">another</span>dependency</button></div><div class=next><button class=next ng-click=next()>next <span ng-if=currentTestQ.next>({{ currentTestQ.next.Q.question }})</span> <span ng-if=!currentTestQ.next>(new)</span></button></div><button type=button ng-click=submit()>Submit</button></form></div>"
  );


  $templateCache.put('views/newQuestion.html',
    "<div class=question ng-if=currentQuestion><div class=questionText><label>Question:</label><textarea name=question rows=4 required ng-minlength=3 ng-model=currentQuestion.question type=text class=form-control placeholder=\"\"></textarea></div><div id=choices><label>Answer choices:</label><div class=choice ng-repeat=\"choice in currentQuestion.choices\"><input required ng-model=choice.value> <input ng-model=choice.correct type=checkbox></div><button ng-click=dqNewQuestion.addChoice()>add another choice</button></div></div>"
  );


  $templateCache.put('views/student.html',
    "<student-question></student-question>"
  );


  $templateCache.put('views/studentQuestion.html',
    "<div class=student><div class=question><p class=question>{{ currentQuestion.question }}</p><ul class=choices><li class=choice ng-repeat=\"choice in currentQuestion.choices\"><p><button ng-style=studentQuestion.style(choice) class=choose ng-click=\"studentQuestion.choose(currentQuestion, choice)\">{{ letters[$index] }}</button> <span class=choice>{{ choice.value }}</span></p></li></ul><button ng-click=studentQuestion.submit(currentQuestion) class=submit>submit</button></div></div>"
  );


  $templateCache.put('views/teacher.html',
    "<test ng-if=currentTest></test><div class=home ng-if=!currentTest><form novalidate name=newTest><input required ng-model=createTest.name> <button class=newTest ng-click=teacher.newTest()>add test</button></form><ul class=oldTests><li ng-repeat=\"t in tests\" ng-click=teacher.setTest(t)>{{ t.name }}</li></ul></div>"
  );


  $templateCache.put('views/test.html',
    "<div class=container><div class=one><div class=parent links-nav=parent></div></div><div class=two><div class=a><!-- <previous-questions></previous-questions> --><div class=previous links-nav=previous></div></div><div class=b><div class=fresh ng-if=\"currentTest && !currentQuestion\"><button class=new ng-click=test.newQuestionBtn()>New Question</button> <button class=existing ng-click=test.oldQuestionBtn()>Existing Question</button><ul ng-if=oldQuestions class=existing><li ng-repeat=\"q in oldQuestions\" ng-click=test.setQ(q)>{{ q.question }}</li></ul></div><form novalidate name=newQuestion dq-new-question></form></div><div class=c><div class=next links-nav=next></div><div ng-if=currentQuestion class=next><button class=next ng-click=test.next()>next</button></div></div></div><div class=three><div class=dependencies links-nav=dependency></div><button ng-if=currentQuestion ng-click=test.dependency() class=newDependency>Add dependency</button><div ng-if=currentQuestion class=submit><button type=button ng-click=test.submit()>Submit the test</button></div></div></div>"
  );

}]);
