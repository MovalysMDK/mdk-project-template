'use strict';

angular.module('mockModule').run([
	'$httpBackend', '$resource',
	function($httpBackend, $resource) {
		
		// This will redirect any get query and return the given file from resources
		/*$httpBackend.whenGET('http://www.example.com/getdata').respond(
			$resource('./assets/mock/mockanswer.json').query()
		);*/

		// Any other query should NOT be mocked
	    $httpBackend.whenGET(/[\s\S]*/).passThrough();
	    $httpBackend.whenPOST(/[\s\S]*/).passThrough();
	    $httpBackend.whenGET(/\*\*\/assets\/\*\*/).passThrough();
        $httpBackend.whenGET(/\D+(\.(pdf))$/).passThrough();
	}
]);
